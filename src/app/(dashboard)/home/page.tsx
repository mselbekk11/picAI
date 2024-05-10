import React from 'react';
import Models from '@/components/dashboard/generate/Models';

const page = async () => {
  return (
    <div className='flex flex-col justify-between'>
      <Models />
    </div>
  );
};

export default page;
