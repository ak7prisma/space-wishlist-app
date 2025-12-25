'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { Button } from '@/components/ui/Button'; 
import { Modal } from '@/components/ui/Modal';
import { WishlistFilter } from './wishlist/WishlistFilter';
import { WishCard } from './wishlist/WishCard';
import { staggerContainer } from '@/lib/animation';

// Interface Wish
interface Wish {
  id: string;
  text: string;
  author: string;
  createdAt: number;
}

const Items1Page = 9; 

export default function WishlistSection() {
  const { wishes, isLoaded, deleteWish, updateWish } = useWishlist(); 
  const now = useCurrentTime();
  
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(Items1Page);

  // Modal State
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editMessage, setEditMessage] = useState('');

  // Modals Handler
  const openEditModal = (wish: Wish) => {
    setSelectedWish(wish);
    setEditMessage(wish.text);
    setIsEditOpen(true);
  };

  const openDeleteModal = (wish: Wish) => {
    setSelectedWish(wish);
    setIsDeleteOpen(true);
  };

  // Edit and Deletee Handler
  const handleConfirmEdit = () => {
    if (selectedWish && editMessage.trim()) {
      updateWish(selectedWish.id, editMessage);
      setIsEditOpen(false);
      setSelectedWish(null);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedWish) {
      deleteWish(selectedWish.id);
      setIsDeleteOpen(false);
      setSelectedWish(null);
    }
  };

  // Filtered Wishes
  const filteredWishes = useMemo(() => {
    return wishes.filter(wish => 
      wish.text.toLowerCase().includes(search.toLowerCase()) || 
      wish.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [wishes, search]);

  const visibleWishes = filteredWishes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWishes.length;

  if (!isLoaded) return null;

  return (
    <section id="wishlist" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
             Transmission Logs
           </h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             Log transmisi sinyal harapan. Kelola datamu melalui terminal ini.
           </p>
        </div>

        {/* Search Bar */}
        <WishlistFilter 
            search={search} 
            setSearch={setSearch} 
            total={filteredWishes.length} 
        />

        {/* Grid List */}
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
                onEditClick={openEditModal}
                onDeleteClick={openDeleteModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredWishes.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-slate-400">No signals found...</p>
            {search && (
              <button onClick={() => setSearch('')} className="mt-2 text-cyan-400 hover:text-cyan-600">
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button onClick={() => setVisibleCount(prev => prev + Items1Page)} variant="outline" icon={<RefreshCcw size={16} />}>
                Load More Signals
            </Button>
          </div>
        )}

      </div>

      {/* Modals */}
      
      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Terminate Signal?"
        variant="danger"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="bg-red-600 hover:bg-red-500 shadow-red-900/20" 
              onClick={handleConfirmDelete}
            >
              Yes, Delete
            </Button>
          </>
        }
      >
        <div className="text-slate-300 flex flex-col items-center text-center gap-4 py-2">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
              <AlertTriangle size={24} />
            </div>
            <p>
              Are you sure you want to delete this signal from
            </p>
            <span className="font-bold text-white mx-1">@{selectedWish?.author}</span>?
           
            <p className="text-sm text-slate-500">
              This action cannot be undone. The signal will be lost in space forever.
           </p>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Modulate Signal"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleConfirmEdit}>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono text-slate-500 mb-1.5 block">ORIGINAL AUTHOR</span>
            <div className="text-sm text-slate-300 font-mono bg-slate-900/50 p-2 rounded border border-white/5">
               {selectedWish?.author}
            </div>
          </div>
          
          <div>
            <span className="text-xs font-mono text-slate-500 mb-1.5 block">SIGNAL MESSAGE</span>
            <textarea
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-md p-3 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 resize-none h-32"
              placeholder="Type your new message..."
              autoFocus
            />
          </div>
        </div>
      </Modal>

    </section>
  );
}