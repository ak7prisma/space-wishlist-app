'use client';

import React, { useState } from 'react';
import { Stars } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FormInput } from '@/components/ui/FormInput';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { useWishlist } from '@/context/WishlistContext';
import { Wish } from '@/types/wish';

export function WishForm() {

  const { addWish } = useWishlist();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: crypto.randomUUID(),
      text: message,
      author: name,
      createdAt: Date.now(),
      isCompleted: false
    };

    addWish(newWish);

    await new Promise(resolve => setTimeout(resolve, 500));

    setName('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <Card className="p-8 h-full border-t-white/20">
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400 tracking-tight flex items-center gap-3">
            Make a Wish <Stars className="text-indigo-600 w-6 h-6" />
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tulis harapanmu. Biarkan tersimpan abadi di antara bintang-bintang digital ini.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 grow">
          <FormInput 
            label="Codename"
            id="name"
            placeholder="Contoh: StarLord"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormInput 
            label="Your Wish"
            id="wish"
            textarea
            rows={4}
            placeholder="Ketik harapanmu di sini..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="pt-2">
            <SubmitButton 
                isLoading={isSubmitting} 
                text="Send to Universe"
                loadingText="Transmitting..."
                className="w-full text-lg"
            />
          </div>
        </form>
      </div>
    </Card>
  );
}