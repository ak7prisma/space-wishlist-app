import { useState, useMemo, useEffect } from 'react';
import { Wish } from '@/types/wish';

const WISH_PER_PAGE = 9;

export const useWishlistLogic = (
  wishes: Wish[] | null, 
  updateWish: (id: string, newText: string) => void, 
  deleteWish: (id: string) => void
) => {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(WISH_PER_PAGE);
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'edit' | 'delete'>('none');

  useEffect(() => {
    setVisibleCount(WISH_PER_PAGE);
  }, [search]);

  // Filtering Logic
  const filteredWishes = useMemo(() => {
    if (!wishes) return [];
    const lowerSearch = search.toLowerCase();

    return wishes.filter(wish => 
      (wish.text || '').toLowerCase().includes(lowerSearch) || 
      (wish.author || '').toLowerCase().includes(lowerSearch)
    );
  }, [wishes, search]);

  // Pagination Logic
  const visibleWishes = filteredWishes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWishes.length;
  const showLess = !hasMore && filteredWishes.length > WISH_PER_PAGE;

  // Action Handlers

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + WISH_PER_PAGE);
  };

  const handleShowLess = () => {
    const section = document.getElementById('wishlist');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    
    setTimeout(() => setVisibleCount(WISH_PER_PAGE), 300);
  };

  // Modal Handlers

  const openModal = (type: 'edit' | 'delete', wish: Wish) => {
    setSelectedWish(wish);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal('none');
    setTimeout(() => setSelectedWish(null), 300);
  };

  const onConfirmUpdate = (newText: string) => {
    if (selectedWish) {
      updateWish(selectedWish.id, newText);
      closeModal();
    }
  };

  const onConfirmDelete = () => {
    if (selectedWish) {
      deleteWish(selectedWish.id);
      closeModal();
    }
  };

  return {
    // Search & Data
    search,
    setSearch,
    visibleWishes,
    totalWishes: filteredWishes.length,
    
    // Pagination Flags & Actions
    hasMore,
    showLess,
    handleLoadMore,
    handleShowLess,

    // Modal State & Actions
    activeModal,
    selectedWish,
    openModal,
    closeModal,
    onConfirmUpdate,
    onConfirmDelete
  };
};