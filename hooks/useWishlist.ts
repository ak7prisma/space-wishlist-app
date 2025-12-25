import { useState, useEffect } from 'react';

export interface Wish {
  id: string;
  text: string;
  author: string;
  createdAt: number;
  isCompleted: boolean;
}

export function useWishlist() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('space_wishlist');
    if (saved) {
      setWishes(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('space_wishlist', JSON.stringify(wishes));
    }
  }, [wishes, isLoaded]);

//CRUD Wishlist

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