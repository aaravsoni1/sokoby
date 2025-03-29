import axios from 'axios';
import { JWTTokenDto, LoginDto, MerchantDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const authService = {
  // Merchant signup
  signup: async (merchantData: MerchantDto): Promise<MerchantDto> => {
    const response = await axios.post(`${API_URL}/auth/signup`, merchantData);
    return response.data;
  },

  // Merchant login
  login: async (loginData: LoginDto): Promise<JWTTokenDto> => {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    return response.data;
  },

  // Customer login
  customerLogin: async (loginData: LoginDto): Promise<JWTTokenDto> => {
    const response = await axios.post(`${API_URL}/auth/customer/login`, loginData);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    // Note: Implement logout endpoint in backend if needed
    localStorage.removeItem('auth_token');
  },

  // Google login
  googleLogin: async (): Promise<void> => {
    window.location.href = `${API_URL}/auth/google/login`;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Get current user token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
}; 