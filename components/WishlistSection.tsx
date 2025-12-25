'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { Wish } from '@/types/wish';
import { staggerContainer } from '@/lib/animation';
import { Button } from '@/components/ui/Button'; 
import { WishlistFilter } from './wishlist/WishlistFilter';
import { WishCard } from './wishlist/WishCard';
import { DeleteWishModal } from './modals/DeleteWishModal';
import { EditWishModal } from './modals/UpdateWishModal';
import { WishlistEmpty } from './wishlist/WishListEmpty';

const Wish1Page = 9; 

export default function WishlistSection() {
  const { wishes, isLoaded, deleteWish, updateWish } = useWishlist(); 
  const now = useCurrentTime();
  
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(Wish1Page);

  // Modal State
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'edit' | 'delete'>('none');

  // Actions
  const openModal = (type: 'edit' | 'delete', wish: Wish) => {
    setSelectedWish(wish);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal('none');
    setTimeout(() => setSelectedWish(null), 300);
  };

  const handleUpdate = (newText: string) => {
    if (selectedWish) {
      updateWish(selectedWish.id, newText);
      closeModal();
    }
  };

  const handleDelete = () => {
    if (selectedWish) {
      deleteWish(selectedWish.id);
      closeModal();
    }
  };

  // Filtered Wishes
  const filteredWishes = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return wishes.filter(wish => 
      wish.text.toLowerCase().includes(lowerSearch) || 
      wish.author.toLowerCase().includes(lowerSearch)
    );
  }, [wishes, search]);

  const visibleWishes = filteredWishes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWishes.length;

  if (!isLoaded) return null;

  return (
    <section id="wishlist" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
             Transmission Logs
           </h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             Log transmisi sinyal harapan. Kelola harapanmu melalui terminal ini.
           </p>
        </div>

        {/* Search Bar*/}
        <WishlistFilter 
            search={search} 
            setSearch={setSearch} 
            total={filteredWishes.length} 
        />

        {/* Grid List Content */}
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="popLayout">
            {visibleWishes.map((item, index) => (
              <WishCard 
                key={item.id} 
                item={item} 
                index={index} 
                now={now}
                onEditClick={(w) => openModal('edit', w)}
                onDeleteClick={(w) => openModal('delete', w)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredWishes.length === 0 && (
          <WishlistEmpty 
            hasSearch={!!search} 
            onClear={() => setSearch('')} 
          />
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button 
                onClick={() => setVisibleCount(prev => prev + Wish1Page)} 
                variant="outline" 
                icon={<RefreshCcw size={16} />}
            >
                Load More Signals
            </Button>
          </div>
        )}

      </div>

      {/* Modals */}
      <DeleteWishModal 
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        onConfirm={handleDelete}
        wish={selectedWish}
      />

      <EditWishModal 
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        onConfirm={handleUpdate}
        wish={selectedWish}
      />

    </section>
  );
}