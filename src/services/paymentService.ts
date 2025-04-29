import axios from 'axios';
import { PaymentDto, PaymentIntentDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const paymentService = {
  // Create a payment for a specific order
  createPayment: async (
    orderId: string, 
    paymentMethodId: string
  ): Promise<PaymentDto> => {
    const response = await axios.post(`${API_URL}/payments/order/${orderId}`, { 
      paymentMethodId 
    });
    return response.data;
  },

  // Get a payment by its ID
  getPaymentById: async (paymentId: string): Promise<PaymentDto> => {
    const response = await axios.get(`${API_URL}/payments/${paymentId}`);
    return response.data;
  },

  // Get payment for a specific order
  getPaymentByOrderId: async (orderId: string): Promise<PaymentDto> => {
    const response = await axios.get(`${API_URL}/payments/order/${orderId}`);
    return response.data;
  },

  // Create a payment intent (for Stripe or similar payment processors)
  createPaymentIntent: async (
    amount: number, 
    currency: string
  ): Promise<PaymentIntentDto> => {
    const response = await axios.post(`${API_URL}/payments/intent`, { 
      amount, 
      currency 
    });
    return response.data;
  },

  // Confirm payment (for additional verification if needed)
  confirmPayment: async (
    paymentId: string, 
    additionalData?: Record<string, unknown>
  ): Promise<PaymentDto> => {
    const response = await axios.post(`${API_URL}/payments/${paymentId}/confirm`, additionalData);
    return response.data;
  }
}; 