import axios from 'axios';
import { StoreDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const storeService = {
  // Create a store for a specific merchant with logo upload
  createStore: async (
    merchantId: string, 
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

    const response = await axios.post(`${API_URL}/store/create/${merchantId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Get a store by its ID
  getStoreById: async (storeId: string): Promise<StoreDto> => {
    const response = await axios.get(`${API_URL}/store/${storeId}`);
    return response.data;
  },

  // Get store by merchant ID
  getStoreByMerchantId: async (merchantId: string): Promise<StoreDto> => {
    const response = await axios.get(`${API_URL}/store/merchant/${merchantId}`);
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

    const response = await axios.get(`${API_URL}/store/search`, {
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

    const response = await axios.put(`${API_URL}/store/update/${storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Delete a store
  deleteStore: async (storeId: string): Promise<void> => {
    await axios.delete(`${API_URL}/store/delete/${storeId}`);
  }
}; 