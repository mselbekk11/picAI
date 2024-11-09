'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

interface DeleteModalButtonProps {
  modelId: string;
}

const DeleteModalButton: React.FC<DeleteModalButtonProps> = ({ modelId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/delete-model`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelId }),
      });

      if (response.ok) {
        setIsOpen(false);
        router.refresh(); // Refresh the page to update the model list
      } else {
        console.error('Failed to delete model');
      }
    } catch (error) {
      console.error('Error deleting model:', error);
    }
    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm' className='w-full'>
          {/* <Trash2 size={12} className='mr-1' /> */}
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this model?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The model will be permanently deleted from the database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalButton;
