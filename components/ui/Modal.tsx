import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Card } from './Card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'danger';
}

export function Modal({ isOpen, onClose, title, children, footer, variant = 'default' }: Readonly<ModalProps>) {
    
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const borderColor = variant === 'danger' ? 'border-red-500/30' : 'border-white/10';
  const glowColor = variant === 'danger' ? 'shadow-red-900/20' : 'shadow-cyan-900/20';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg relative"
            >
              <Card className={`relative flex flex-col w-full max-h-[90vh] overflow-hidden ${borderColor} shadow-2xl ${glowColor}`}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h3 className={`text-xl font-bold ${variant === 'danger' ? 'text-red-400' : 'text-white'}`}>
                    {title}
                  </h3>
                  <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                  {children}
                </div>

                {/* Footer */}
                {footer && (
                  <div className="p-6 pt-0 flex justify-end gap-3">
                    {footer}
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}