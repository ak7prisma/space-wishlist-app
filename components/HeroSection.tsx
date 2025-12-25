'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animation';
import { useWishlist } from '@/context/WishlistContext';
import { WishForm } from './hero/WishForm';
import { RecentWish } from './hero/RecentWish';

export default function HeroSection() {

    const { wishes } = useWishlist();

  return (
    <section className="relative z-10 pb-17 md:pb-20 pt-27 md:pt-30 px-4 sm:px-6 lg:px-8 flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >

          {/* Left Section (Wish Form) */}
          <motion.div className="lg:col-span-5 h-full" variants={fadeUp}>
             <WishForm />
          </motion.div>

          {/* Right Section (Recent Wish) */}
          <RecentWish wishes={wishes} totalWishes={wishes.length} />

        </motion.div>
      </div>
    </section>
  );
}