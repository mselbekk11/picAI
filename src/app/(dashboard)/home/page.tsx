import React from 'react';
import Models from '@/components/dashboard/generate/Models';

const Home = async () => {
  return (
    <div className='flex flex-col justify-between'>
      <Models />
    </div>
  );
};

export default Home;
