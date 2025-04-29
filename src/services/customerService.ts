import axios from 'axios';
import { CustomerDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const customerService = {
  // Create a customer for a specific store
  createCustomer: async (storeId: string, customerData: CustomerDto): Promise<CustomerDto> => {
    const response = await axios.post(`${API_URL}/customer/create/${storeId}`, customerData);
    return response.data;
  },

  // Get a customer by their ID
  getCustomerById: async (customerId: string): Promise<CustomerDto> => {
    const response = await axios.get(`${API_URL}/customer/${customerId}`);
    return response.data;
  },

  // Get customers for a specific store
  getCustomersByStoreId: async (storeId: string): Promise<CustomerDto[]> => {
    const response = await axios.get(`${API_URL}/customer/store/${storeId}`);
    return response.data;
  },

  // Search customers with pagination and filtering
  searchCustomers: async (params: {
    query?: string, 
    page?: number, 
    size?: number, 
    sortBy?: string, 
    direction?: string
  }): Promise<{ content: CustomerDto[], totalPages: number }> => {
    const { 
      query = '', 
      page = 0, 
      size = 10, 
      sortBy = 'name', 
      direction = 'asc' 
    } = params;

    const response = await axios.get(`${API_URL}/customer/search`, {
      params: { query, page, size, sortBy, direction }
    });
    return response.data;
  },

  // Search customers for a specific store
  searchCustomersByStore: async (
    storeId: string, 
    params: {
      query?: string, 
      page?: number, 
      size?: number, 
      sortBy?: string, 
      direction?: string
    }
  ): Promise<{ content: CustomerDto[], totalPages: number }> => {
    const { 
      query = '', 
      page = 0, 
      size = 10, 
      sortBy = 'name', 
      direction = 'asc' 
    } = params;

    const response = await axios.get(`${API_URL}/customer/search/store/${storeId}`, {
      params: { query, page, size, sortBy, direction }
    });
    return response.data;
  },

  // Update a customer
  updateCustomer: async (customerId: string, customerData: CustomerDto): Promise<CustomerDto> => {
    const response = await axios.put(`${API_URL}/customer/update/${customerId}`, customerData);
    return response.data;
  },

  // Delete a customer
  deleteCustomer: async (customerId: string): Promise<void> => {
    await axios.delete(`${API_URL}/customer/delete/${customerId}`);
  }
}; 