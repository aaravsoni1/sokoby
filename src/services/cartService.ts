import axios from 'axios';
import { CartDto, CartItemDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const cartService = {
  // Get or create a cart for a specific customer
  getCart: async (customerId: string): Promise<CartDto> => {
    const response = await axios.get(`${API_URL}/cart/${customerId}`);
    return response.data;
  },

  // Add an item to the cart
  addItemToCart: async (customerId: string, cartItemData: CartItemDto): Promise<CartDto> => {
    const response = await axios.post(`${API_URL}/cart/${customerId}/add`, cartItemData);
    return response.data;
  },

  // Update a cart item
  updateCartItem: async (
    customerId: string, 
    cartItemId: string, 
    cartItemData: CartItemDto
  ): Promise<CartDto> => {
    const response = await axios.put(
      `${API_URL}/cart/${customerId}/update/${cartItemId}`, 
      cartItemData
    );
    return response.data;
  },

  // Remove an item from the cart
  removeCartItem: async (customerId: string, cartItemId: string): Promise<CartDto> => {
    const response = await axios.delete(`${API_URL}/cart/${customerId}/remove/${cartItemId}`);
    return response.data;
  },

  // Clear the entire cart
  clearCart: async (customerId: string): Promise<void> => {
    await axios.delete(`${API_URL}/cart/${customerId}/clear`);
  }
}; 