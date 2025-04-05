import axios from 'axios';
import { CustomerDto, OrderDto, ProductDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  salesByMonth: Array<{ name: string; value: number; orders: number }>;
  salesByCategory: Array<{ name: string; value: number }>;
  trafficSources: Array<{ name: string; value: number }>;
  recentOrders: OrderDto[];
  topProducts: ProductDto[];
  recentCustomers: CustomerDto[];
}

export const dashboardService = {
  // Get dashboard statistics for a specific store
  getDashboardStats: async (storeId: string): Promise<DashboardStats> => {
    try {
      const response = await apiClient.get(`/dashboard/store/${storeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
}; 