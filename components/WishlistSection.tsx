'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, ChevronUp } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext'; 
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { Button } from '@/components/ui/Button'; 
import { WishlistFilter } from './wishlist/WishlistFilter';
import { WishCard } from './wishlist/WishCard';
import { DeleteWishModal } from './modals/DeleteWishModal';
import { EditWishModal } from './modals/UpdateWishModal';
import { WishlistEmpty } from './wishlist/WishListEmpty';
import { useWishlistLogic } from '@/hooks/useWishlistLogic';
import { cardVariants } from '@/lib/animation';

export default function WishlistSection() {
  const { wishes, isLoaded, deleteWish, updateWish } = useWishlist(); 
  const now = useCurrentTime();

  const logic = useWishlistLogic(wishes, updateWish, deleteWish);

  if (!isLoaded) return null;

  return (
    <section id="wishlist" className="relative z-10 w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
             Transmission Logs
           </h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             Log transmisi sinyal harapan. Kelola datamu melalui terminal ini.
           </p>
        </div>

        {/* Filter Component */}
        <WishlistFilter 
            search={logic.search} 
            setSearch={logic.setSearch} 
            total={logic.totalWishes} 
        />

        {/* Grid List */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false}> 
            {logic.visibleWishes.map((item, index) => (
              <WishCard 
                key={item.id} 
                item={item} 
                index={index} 
                now={now}
                onEditClick={(w) => logic.openModal('edit', w)}
                onDeleteClick={(w) => logic.openModal('delete', w)}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                viewport={{ once: true }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {logic.totalWishes === 0 && (
          <WishlistEmpty
            hasSearch={!!logic.search} 
            onClear={() => logic.setSearch('')} 
          />
        )}

        {/* Pagination Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          {logic.hasMore && (
            <Button 
                onClick={logic.handleLoadMore} 
                variant="outline" 
                icon={<RefreshCcw size={16} />}
            >
                Load More Signals
            </Button>
          )}

          {logic.showLess && (
             <Button 
                onClick={logic.handleShowLess} 
                variant="outline" 
                icon={<ChevronUp size={16} />}
                className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/40"
            >
                Show Less
            </Button>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeleteWishModal 
        isOpen={logic.activeModal === 'delete'}
        onClose={logic.closeModal}
        onConfirm={logic.onConfirmDelete}
        wish={logic.selectedWish}
      />

      <EditWishModal 
        isOpen={logic.activeModal === 'edit'}
        onClose={logic.closeModal}
        onConfirm={logic.onConfirmUpdate}
        wish={logic.selectedWish}
      />
    </section>
  );
}