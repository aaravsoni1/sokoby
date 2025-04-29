import axios from 'axios';
import { JWTTokenDto, LoginDto, MerchantDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  // Merchant signup
  signup: async (merchantData: MerchantDto): Promise<MerchantDto> => {
    const response = await axios.post(`${API_URL}/auth/signup`, merchantData);
    
    // Store merchant ID in localStorage after successful signup
    if (response.data.id) {
      localStorage.setItem('merchantId', response.data.id);
    }
    
    return response.data;
  },

  // Merchant login
  login: async (loginData: LoginDto): Promise<JWTTokenDto> => {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    
    // Store token and merchant ID in localStorage after successful login
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      
      // Store merchant ID from the nested merchant object
      if (response.data.merchant && response.data.merchant.id) {
        localStorage.setItem('merchantId', response.data.merchant.id);
      }
    }
    
    return response.data;
  },

  // Customer login
  customerLogin: async (loginData: LoginDto): Promise<JWTTokenDto> => {
    const response = await axios.post(`${API_URL}/auth/customer/login`, loginData);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('merchantId');
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