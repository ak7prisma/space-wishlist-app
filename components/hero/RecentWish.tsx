import { motion, AnimatePresence } from 'framer-motion';
import { Radio, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '../ui/Button';
import { fadeUp, staggerContainer, floatAnimation } from '@/lib/animation';
import { CodenameTextStyle } from '@/lib/textstyle';
import { formatTimeAgo } from '@/lib/utils';
import { useCurrentTime } from '@/hooks/useCurrentTime';

interface Wish {
  id: string;
  text: string;
  author: string;
  createdAt: number;
}

interface RecentWishesProps {
  wishes: Wish[];
  totalWishes: number;
}

export function RecentWish({ wishes, totalWishes }: Readonly<RecentWishesProps>) {
  const now = useCurrentTime(); 
  const recentItems = wishes.slice(0, 3);

  return (
    <div className="lg:col-span-7 flex flex-col justify-start h-full lg:pl-8">
      {/* Header Section */}
      <motion.div className="mb-8 flex items-center justify-between" variants={fadeUp}>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Latest Signals</h2>
          <p className="text-slate-400 text-sm mt-1">Sinyal harapan yang baru saja tertangkap.</p>
        </div>
        
        <motion.div variants={floatAnimation} animate="animate">
          <Badge variant="glow" className="flex items-center gap-2 text-green-400 border-green-500/30 bg-green-500/10 px-4 py-1.5">
             <Radio size={14} className="animate-pulse" /> LIVE
          </Badge>
        </motion.div>
      </motion.div>

      {/* List Section */}
      <motion.div className="space-y-5" variants={staggerContainer}>
        <AnimatePresence mode='popLayout' initial={false}>
          {recentItems.map((item, index) => {
            const style = CodenameTextStyle[index % CodenameTextStyle.length];
            
            return (
              <motion.div 
                key={item.id} 
                layout 
                variants={fadeUp}
                initial="hidden" 
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <Card 
                  className={`p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 ${style.borderGlow}`}
                >
                  <div className="flex flex-col gap-3 relative z-10">
                    <p className="text-slate-200 text-lg font-light leading-relaxed">
                      "{item.text}"
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className={`text-sm font-bold font-mono ${style.color}`}>
                        {item.author}
                      </span>
                      <span className="text-slate-500 text-xs font-mono">
                        {formatTimeAgo(item.createdAt, now)}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Empty State */}
        {recentItems.length === 0 && (
           <motion.div variants={fadeUp} className="text-center py-10 opacity-50 border border-dashed border-white/10 rounded-2xl">
              <p className="text-slate-400">No signals detected yet...</p>
              <p className="text-xs text-slate-600 mt-2">Be the first to transmit.</p>
           </motion.div>
        )}
      </motion.div>
      
      {/* View All Button - UPDATED */}
      {totalWishes > 3 && (
           <motion.div className="mt-6 flex justify-center" variants={fadeUp}>
              <Button 
                href="#wishlist"
                variant="ghost"
                size="sm"
                icon={<ArrowDown size={14} />} 
                iconPosition="right"
                className="text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
              >
                 View All Signals ({totalWishes})
              </Button>
           </motion.div>
      )}

    </div>
  );
}