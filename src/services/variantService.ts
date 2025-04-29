import axios from 'axios';
import { VariantDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const variantService = {
  // Create a variant for a specific product
  createVariant: async (productId: string, variantData: VariantDto): Promise<VariantDto> => {
    const response = await axios.post(`${API_URL}/variant/create/${productId}`, variantData);
    return response.data;
  },

  // Get a variant by its ID
  getVariantById: async (variantId: string): Promise<VariantDto> => {
    const response = await axios.get(`${API_URL}/variant/${variantId}`);
    return response.data;
  },

  // Get variants for a specific product
  getVariantsByProductId: async (productId: string): Promise<VariantDto[]> => {
    const response = await axios.get(`${API_URL}/variant/product/${productId}`);
    return response.data;
  },

  // Update a variant
  updateVariant: async (variantId: string, variantData: VariantDto): Promise<VariantDto> => {
    const response = await axios.put(`${API_URL}/variant/update/${variantId}`, variantData);
    return response.data;
  },

  // Delete a variant
  deleteVariant: async (variantId: string): Promise<void> => {
    await axios.delete(`${API_URL}/variant/delete/${variantId}`);
  }
}; 