import { motion } from 'framer-motion';
import { Pencil, Trash2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatTimeAgo } from '@/lib/utils';
import { CodenameTextStyle } from '@/lib/textstyle';
import { fadeUp } from '@/lib/animation';

// Interface Wish
interface Wish {
  id: string;
  text: string;
  author: string;
  createdAt: number;
}

interface WishCardProps {
  item: Wish;
  index: number;
  now: number;
  onEditClick: (item: Wish) => void;
  onDeleteClick: (item: Wish) => void;
}

export function WishCard({ item, index, now, onEditClick, onDeleteClick }: Readonly<WishCardProps>) {
  const style = CodenameTextStyle[index % CodenameTextStyle.length];
  
  return (
    <motion.div
      layout
      variants={fadeUp}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card className={`h-full flex flex-col justify-between p-6 relative group/card transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${style.borderGlow}`}>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => onEditClick(item)}
            className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors border border-white/5"
            title="Edit Signal"
          >
            <Pencil size={14} />
          </button>
          <button 
            onClick={() => onDeleteClick(item)}
            className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors border border-white/5"
            title="Delete Signal"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4 grow">
           <div className="mb-2 opacity-10 text-4xl font-serif leading-none">“</div>
           <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed wrap-break-word whitespace-pre-wrap">
             {item.text}
           </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${style.color.replace('text-', 'bg-')}`}></div>
             <span className={`text-xs font-bold font-mono ${style.color}`}>
                {item.author}
             </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-slate-600 font-mono uppercase tracking-wider">
             <Clock size={10} />
             {formatTimeAgo(item.createdAt, now)}
          </span>
        </div>

      </Card>
    </motion.div>
  );
}