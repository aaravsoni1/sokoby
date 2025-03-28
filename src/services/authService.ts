import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginDto {
  email: string;
  password: string;
}

export interface MerchantDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface JWTTokenDto {
  token: string;
}

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
    await axios.post(`${API_URL}/auth/logout`);
  },

  // Google login
  googleLogin: async (): Promise<void> => {
    window.location.href = `${API_URL}/auth/google/login`;
  }
}; 