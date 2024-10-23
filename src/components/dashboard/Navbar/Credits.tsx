import { Button } from '@/components/ui/button';
import { Image, Zap } from 'lucide-react';
import { Box } from 'lucide-react';
import Link from 'next/link';

export default function Credits() {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center mr-1'>
        <Image size={18} className='mr-1' />
        <div>0</div>
      </div>
      <div className='flex items-center'>
        <Box size={18} className='mr-1' />
        <div>0</div>
      </div>
      <Link href='/billing'>
        <Button variant='purple' size='sm' className='ml-4'>
          {' '}
          <Zap size={16} className='mr-1' />
          Upgrade
        </Button>
      </Link>
    </div>
  );
}
