'use client';

import React, { createContext, useContext } from 'react';
import { useWishlistData } from '@/hooks/useWishlistData';

type WishlistContextType = ReturnType<typeof useWishlistData>;

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // Panggil Logic Hook
  const wishlistData = useWishlistData();

  return (
    <WishlistContext.Provider value={wishlistData}>
      {children}
    </WishlistContext.Provider>
  );
}

// Hook untuk dipakai di Component
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}