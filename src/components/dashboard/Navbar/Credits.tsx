'use client';

import { Button } from '@/components/ui/button';
import { Image, Zap } from 'lucide-react';
import { Box } from 'lucide-react';
import Link from 'next/link';
import { useCredits } from '@/context/CreditsContext';

export default function Credits() {
  const { modelCredits, imageCredits } = useCredits();

  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center mr-1'>
        <Box size={18} className='mr-1' color='#af40e2' />
        <div>{modelCredits}</div>
      </div>
      <div className='flex items-center'>
        <Image size={18} className='mr-1' color='#af40e2' />
        <div>{imageCredits}</div>
      </div>
      {modelCredits ? (
        ''
      ) : (
        <Link href='/billing'>
          <Button variant='purple' size='sm' className='ml-4'>
            <Zap size={16} className='mr-1' />
            Upgrade
          </Button>
        </Link>
      )}
    </div>
  );
}
