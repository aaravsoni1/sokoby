'use client';

import { storeService } from '@/services/storeService';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface StoreContextType {
  storeId: string | null;
  storeName: string | null;
  isLoading: boolean;
  error: string | null;
  setStoreId: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [storeId, setStoreIdState] = useState<string | null>(null);
  const [storeName, setStoreName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching store information...');
        
        // Check if we have a merchant ID in localStorage
        const merchantId = localStorage.getItem('merchant_id');
        console.log('Merchant ID from localStorage:', merchantId);
        
        if (merchantId) {
          console.log('Fetching store by merchant ID:', merchantId);
          // Fetch the store for this merchant
          const store = await storeService.getStoreByMerchantId(merchantId);
          console.log('Store found by merchant ID:', store);
          setStoreIdState(store.id);
          setStoreName(store.name);
        } else {
          // Check if we have a store ID in localStorage
          const savedStoreId = localStorage.getItem('currentStoreId');
          console.log('Store ID from localStorage:', savedStoreId);
          
          if (savedStoreId) {
            console.log('Fetching store by ID:', savedStoreId);
            setStoreIdState(savedStoreId);
            // Fetch store details
            const store = await storeService.getStore(savedStoreId);
            console.log('Store found by ID:', store);
            setStoreName(store.name);
          } else {
            console.log('No store ID or merchant ID found in localStorage');
          }
        }
      } catch (err) {
        console.error('Error fetching store:', err);
        setError('Failed to load store information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, []);

  const setStoreId = (id: string) => {
    setStoreIdState(id);
    localStorage.setItem('currentStoreId', id);
  };

  return (
    <StoreContext.Provider
      value={{
        storeId,
        storeName,
        isLoading,
        error,
        setStoreId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}; 