'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface DeleteImageButtonProps {
  generationId: string;
  imageIndex: number;
  imageUrls: string[];
}

const DeleteImageButton: FC<DeleteImageButtonProps> = ({ generationId, imageIndex, imageUrls }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const supabase = createClientComponentClient();

      // Delete the image from the database
      await supabase
        .from('headshot_generations')
        .update({ image_urls: imageUrls.filter((_, i) => i !== imageIndex) })
        .eq('id', generationId);

      // Refresh the page to reflect the changes
      router.refresh();
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button variant='destructive' className='w-full' onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete Image'}
    </Button>
  );
};

export default DeleteImageButton;
