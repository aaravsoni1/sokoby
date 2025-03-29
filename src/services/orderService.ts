import axios from 'axios';
import { OrderDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const orderService = {
  // Get all orders (if applicable)
  getAllOrders: async (): Promise<OrderDto[]> => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  },

  // Get an order by its ID
  getOrderById: async (orderId: string): Promise<OrderDto> => {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  },

  // Get orders for a specific customer
  getOrdersByCustomerId: async (customerId: string): Promise<OrderDto[]> => {
    const response = await axios.get(`${API_URL}/orders/customer/${customerId}`);
    return response.data;
  },

  // Get orders for a specific store
  getOrdersByStoreId: async (storeId: string): Promise<OrderDto[]> => {
    const response = await axios.get(`${API_URL}/orders/store/${storeId}`);
    return response.data;
  },

  // Create a new order
  createOrder: async (orderData: OrderDto): Promise<OrderDto> => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  },

  // Update an existing order
  updateOrder: async (orderId: string, orderData: OrderDto): Promise<OrderDto> => {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, orderData);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: string): Promise<OrderDto> => {
    const response = await axios.patch(`${API_URL}/orders/${orderId}/status`, status);
    return response.data;
  },

  // Delete an order
  deleteOrder: async (orderId: string): Promise<void> => {
    await axios.delete(`${API_URL}/orders/${orderId}`);
  }
}; 