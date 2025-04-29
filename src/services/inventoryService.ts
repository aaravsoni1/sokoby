import axios from 'axios';
import { InventoryItemDto, InventoryLevelDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const inventoryService = {
  // Inventory Items
  getAllInventoryItems: async (): Promise<InventoryItemDto[]> => {
    const response = await axios.get(`${API_URL}/inventory/items`);
    return response.data;
  },

  // Create an inventory item for a specific variant
  createInventoryItemForVariant: async (
    variantId: string, 
    stock: number
  ): Promise<InventoryItemDto> => {
    const response = await axios.post(`${API_URL}/inventory/items/variant`, { 
      variantId, 
      stock 
    });
    return response.data;
  },

  getInventoryItemById: async (itemId: string): Promise<InventoryItemDto> => {
    const response = await axios.get(`${API_URL}/inventory/items/${itemId}`);
    return response.data;
  },

  updateInventoryItem: async (itemId: string, inventoryData: InventoryItemDto): Promise<InventoryItemDto> => {
    const response = await axios.put(`${API_URL}/inventory/items/${itemId}`, inventoryData);
    return response.data;
  },

  deleteInventoryItem: async (itemId: string): Promise<void> => {
    await axios.delete(`${API_URL}/inventory/items/${itemId}`);
  },

  // Inventory Levels
  getAllInventoryLevels: async (): Promise<InventoryLevelDto[]> => {
    const response = await axios.get(`${API_URL}/inventory/levels`);
    return response.data;
  },

  createInventoryLevel: async (inventoryLevelData: InventoryLevelDto): Promise<InventoryLevelDto> => {
    const response = await axios.post(`${API_URL}/inventory/levels`, inventoryLevelData);
    return response.data;
  },

  getInventoryLevelById: async (levelId: string): Promise<InventoryLevelDto> => {
    const response = await axios.get(`${API_URL}/inventory/levels/${levelId}`);
    return response.data;
  },

  updateInventoryLevel: async (levelId: string, inventoryLevelData: InventoryLevelDto): Promise<InventoryLevelDto> => {
    const response = await axios.put(`${API_URL}/inventory/levels/${levelId}`, inventoryLevelData);
    return response.data;
  },

  deleteInventoryLevel: async (levelId: string): Promise<void> => {
    await axios.delete(`${API_URL}/inventory/levels/${levelId}`);
  }
}; 