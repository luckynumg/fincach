import FedaPay from 'fedapay';
import { fedaPayConfig } from '../config/fedapay';

export class PaymentService {
  constructor() {
    FedaPay.setApiKey(fedaPayConfig.apiKey);
    FedaPay.setEnvironment(fedaPayConfig.environment);
  }

  async createTransaction(data: {
    amount: number;
    description: string;
    currency: string;
    customer: {
      email: string;
      firstname?: string;
      lastname?: string;
    };
  }) {
    try {
      const transaction = await FedaPay.Transaction.create({
        amount: data.amount,
        description: data.description,
        currency: data.currency,
        callback_url: process.env.FEDAPAY_CALLBACK_URL,
        customer: data.customer
      });

      return transaction;
    } catch (error) {
      console.error('FedaPay transaction error:', error);
      throw new Error('Payment transaction failed');
    }
  }

  async verifyTransaction(transactionId: string) {
    try {
      const transaction = await FedaPay.Transaction.retrieve(transactionId);
      return transaction;
    } catch (error) {
      console.error('FedaPay verification error:', error);
      throw new Error('Transaction verification failed');
    }
  }
}