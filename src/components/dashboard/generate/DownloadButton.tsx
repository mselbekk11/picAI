'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import downloadHeadshot from '@/utils/utils';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  imageUrl: string;
  fileName: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ imageUrl, fileName }) => {
  return (
    <Button variant='default' onClick={() => downloadHeadshot(imageUrl, fileName)} className='text-black'>
      <Download size={14} className='mr-2' />
      Download
    </Button>
  );
};

export default DownloadButton;
