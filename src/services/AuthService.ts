import axios from 'axios';

export class AuthService {
  static async login(email: string, password: string) {
    // Simulation d'une API pour le développement
    if (email === 'admin@fincach.com' && password === 'Admin123!') {
      const token = 'admin-token';
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', 'admin');
      return { token, role: 'admin' };
    } else if (email === 'user@fincach.com' && password === 'User123!') {
      const token = 'user-token';
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', 'user');
      return { token, role: 'user' };
    }
    throw new Error('Invalid credentials');
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  static getUserRole() {
    return localStorage.getItem('userRole');
  }
}