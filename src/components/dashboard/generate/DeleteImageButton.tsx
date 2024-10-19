'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteImageButtonProps {
  generationId: string;
  imageIndex: number;
}

const DeleteImageButton: FC<DeleteImageButtonProps> = ({ generationId, imageIndex }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/delete-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ generationId, imageIndex }),
      });

      if (response.ok) {
        // Close the modal
        const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement | null;
        if (closeButton) {
          closeButton.click();
        }
        // Refresh the page to reflect changes
        router.refresh();
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button onClick={handleDelete} disabled={isDeleting} variant='destructive' className='w-full'>
      <Trash2 size={14} className='mr-2' />
      {isDeleting ? 'Deleting...' : 'Delete Image'}
    </Button>
  );
};

export default DeleteImageButton;
