import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Wish } from '@/types/wish';

interface EditWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newText: string) => void;
  wish: Wish | null;
}

export function EditWishModal({ isOpen, onClose, onConfirm, wish }: Readonly<EditWishModalProps>) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen && wish) {
      setMessage(wish.text);
    }
  }, [isOpen, wish]);

  const handleSave = () => {
    if (message.trim()) {
      onConfirm(message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modulate Signal"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSave}>Save Changes</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono text-slate-500 mb-1.5 block">ORIGINAL AUTHOR</span>
          <div className="text-sm text-slate-300 font-mono bg-slate-900/50 p-2 rounded border border-white/5">
             {wish?.author}
          </div>
        </div>
        
        <div>
          <label htmlFor="edit-message" className="text-xs font-mono text-slate-500 mb-1.5 block">SIGNAL MESSAGE</label>
          <textarea
            id="edit-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/10 rounded-md p-3 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 resize-none h-32"
            placeholder="Type your new message..."
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
}