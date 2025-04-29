import axios from 'axios';
import { ProductDto } from './types'; // Create a types file for DTOs

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
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

export const productService = {


  createProductWithFormData: async (formData: FormData): Promise<ProductDto> => {
    const response = await axiosInstance.post('/product/create/form-data', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAllProducts: async (): Promise<ProductDto[]> => {
    const response = await axiosInstance.get('/product/getAll');
    return response.data;
  },

  // Create a product for a specific store
  createProduct: async (storeId: string, productData: ProductDto): Promise<ProductDto> => {
    const response = await axios.post(`${API_URL}/product/create/${storeId}`, productData);
    return response.data;
  },

  // Get a product by its ID
  getProductById: async (productId: string): Promise<ProductDto> => {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  },

  // Get products for a specific store
  getProductsByStoreId: async (storeId: string): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_URL}/product/store/${storeId}`);
    return response.data;
  },

  // Search products with pagination and filtering
  searchProducts: async (params: {
    query?: string, 
    page?: number, 
    size?: number, 
    sortBy?: string, 
    direction?: string
  }): Promise<{ content: ProductDto[], totalPages: number }> => {
    const { 
      query = '', 
      page = 0, 
      size = 10, 
      sortBy = 'name', 
      direction = 'asc' 
    } = params;

    const response = await axios.get(`${API_URL}/product/search`, {
      params: { query, page, size, sortBy, direction }
    });
    return response.data;
  },

  // Update a product
  updateProduct: async (productId: string, productData: ProductDto): Promise<ProductDto> => {
    const response = await axios.put(`${API_URL}/product/update/${productId}`, productData);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (productId: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/product/delete/${productId}`);
  }
}; 