import { useState, useEffect } from 'react';
import { Wish } from '@/types/wish';

export function useWishlistData() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('space_wishlist');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing wishlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('space_wishlist', JSON.stringify(wishes));
    }
  }, [wishes, isLoaded]);

  // CRUD Operations
  const addWish = (wish: Wish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  const deleteWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const updateWish = (id: string, newText: string) => {
    setWishes((prev) => prev.map((w) => w.id === id ? { ...w, text: newText } : w));
  };

  const toggleComplete = (id: string) => {
    setWishes((prev) => prev.map((w) => w.id === id ? { ...w, isCompleted: !w.isCompleted } : w));
  };

  return { wishes, addWish, deleteWish, updateWish, toggleComplete, isLoaded };
}