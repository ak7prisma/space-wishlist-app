import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Wish } from '@/types/wish';

interface DeleteWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  wish: Wish | null;
}

export function DeleteWishModal({ isOpen, onClose, onConfirm, wish }: Readonly<DeleteWishModalProps>) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terminate Signal?"
      variant="danger"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="bg-red-600 hover:bg-red-500 shadow-red-900/20" 
            onClick={onConfirm}
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
        <span className="font-bold text-white mx-1">@{wish?.author}</span>?
         
        <p className="text-sm text-slate-500">
            This action cannot be undone. The signal will be lost in space forever.
        </p>
      </div>
    </Modal>
  );
}