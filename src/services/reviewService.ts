import axios from 'axios';
import { ReviewDto } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const reviewService = {
  // Create a new review
  createReview: async (reviewData: ReviewDto): Promise<ReviewDto> => {
    const response = await axios.post(`${API_URL}/reviews`, reviewData);
    return response.data;
  },

  // Get a review by its ID
  getReviewById: async (reviewId: string): Promise<ReviewDto> => {
    const response = await axios.get(`${API_URL}/reviews/${reviewId}`);
    return response.data;
  },

  // Get reviews for a specific product
  getReviewsByProductId: async (productId: string): Promise<ReviewDto[]> => {
    const response = await axios.get(`${API_URL}/reviews/product/${productId}`);
    return response.data;
  },

  // Get reviews for a specific variant
  getReviewsByVariantId: async (variantId: string): Promise<ReviewDto[]> => {
    const response = await axios.get(`${API_URL}/reviews/variant/${variantId}`);
    return response.data;
  },

  // Get reviews for a specific customer
  getReviewsByCustomerId: async (customerId: string): Promise<ReviewDto[]> => {
    const response = await axios.get(`${API_URL}/reviews/customer/${customerId}`);
    return response.data;
  }
}; 