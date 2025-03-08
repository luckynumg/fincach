import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { emailOrUsername, password } = req.body;

      // Find user by email or username
      const user = await User.findOne({
        $or: [
          { email: emailOrUsername.toLowerCase() },
          { username: emailOrUsername }
        ]
      });

      if (!user || !user.isActive) {
        return res.status(401).json({
          message: 'Invalid credentials or inactive account'
        });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id,
          role: user.role 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during authentication'
      });
    }
  }
}