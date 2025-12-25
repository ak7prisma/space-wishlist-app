'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animation';
import { useWishlist } from '@/hooks/useWishlist';
import { WishForm } from './hero/WishForm';
import { RecentWish } from './hero/RecentWish';

export default function HeroSection() {
  const { wishes, addWish, isLoaded } = useWishlist();

  if (!isLoaded) return null; 

  const handleAddWish = async (name: string, message: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    addWish({
      id: crypto.randomUUID(),
      text: message,
      author: `@${name.replaceAll(/\s+/g, '')}`,
      createdAt: Date.now(),
      isCompleted: false,
    });
  };

  return (
    <section className="relative z-10 py-30 md:py-35 px-4 sm:px-6 lg:px-8 flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >

          {/* Left Section ()Wish Form) */}
          <motion.div className="lg:col-span-5 h-full" variants={fadeUp}>
             <WishForm onAddWish={handleAddWish} />
          </motion.div>

          {/* Right Section (Recent Wish) */}
          <RecentWish wishes={wishes} totalWishes={wishes.length} />

        </motion.div>
      </div>
    </section>
  );
}