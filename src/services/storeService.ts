import axios from 'axios';
import { StoreDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create a custom axios instance with more robust configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  withCredentials: true
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

interface Store {
  id: string
  name: string
  domain: string
  stripeAccountId: string | null
  description: string
  createdAt: string
  updatedAt: string
  merchantId: string
  productType: string
  businessType: string
  revenue: string
  industry: string
  imageUrl: string
}

export const storeService = {
  async getStore(storeId: string): Promise<Store> {
    const response = await apiClient.get(`/store/${storeId}`);
    return response.data;
  },

  // Create a store for a specific merchant with logo upload
  createStore: async (
    merchantId: string,
    formData: FormData
  ): Promise<Store> => {
    const response = await apiClient.post(
      `/store/create/${merchantId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Get store by merchant ID
  getStoreByMerchantId: async (merchantId: string): Promise<Store> => {
    const response = await apiClient.get(`/store/merchant/${merchantId}`);
    return response.data;
  },

  // Search stores with pagination and filtering
  searchStores: async (params: {
    query?: string, 
    page?: number, 
    size?: number, 
    sortBy?: string, 
    direction?: string
  }): Promise<{ content: StoreDto[], totalPages: number }> => {
    const { 
      query = '', 
      page = 0, 
      size = 10, 
      sortBy = 'name', 
      direction = 'asc' 
    } = params;

    const response = await apiClient.get(`/store/search`, {
      params: { query, page, size, sortBy, direction }
    });
    return response.data;
  },

  // Update a store
  updateStore: async (
    storeId: string, 
    storeData: StoreDto, 
    logo?: File
  ): Promise<StoreDto> => {
    const formData = new FormData();
    
    // Append store data fields
    Object.keys(storeData).forEach(key => {
      const value = storeData[key as keyof StoreDto];
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Append logo if provided
    if (logo) {
      formData.append('logo', logo);
    }

    const response = await apiClient.put(`/store/update/${storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Delete a store
  deleteStore: async (storeId: string): Promise<void> => {
    await apiClient.delete(`/store/delete/${storeId}`);
  }
}; 