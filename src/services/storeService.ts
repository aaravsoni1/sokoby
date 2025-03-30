import axios from 'axios';
import { StoreDto } from './types';

// Create a custom axios instance with more robust configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'multipart/form-data'
  }
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

export const storeService = {
  // Create a store for a specific merchant with logo upload
  createStore: async (
    merchantId: string, 
    storeData: {
      name: string;
      domain: string;
      description?: string;
      stripeAccountId?: string;
      productType?: string;
      businessType?: string;
      revenue?: string;
      industry?: string;
    }, 
    logo?: File
  ): Promise<StoreDto> => {
    try {
      console.log('Attempting to create store with data:', {
        merchantId,
        storeData,
        hasLogo: !!logo
      });

      const formData = new FormData();
      
      // Append store data fields
      Object.keys(storeData).forEach(key => {
        const value = storeData[key as keyof typeof storeData];
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Append logo if provided
      if (logo) {
        formData.append('logo', logo);
      }

      // Log the FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`FormData entry: ${key}`, value);
      }

      const response = await apiClient.post(`/store/create/${merchantId}`, formData);
      
      console.log('Store creation response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Detailed store creation error:', {
        error: error.message,
        response: error.response,
        request: error.request
      });

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server error response:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to create store');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up store creation request');
      }
    }
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