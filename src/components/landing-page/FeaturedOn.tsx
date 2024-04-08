import React from 'react';

const FeatureOn = () => {
  // TODO: Add the images of the logos
  return (
    <div className='flex flex-col justify-center items-center space-y-[64px] mt-44'>
      <div className='text-[#ABABB0] text-[32px] font-normal leading-10'>Featured on:</div>
      <div className=' flex justify-center flex-wrap gap-x-20 gap-y-10'>
        <div className='text-3xl font-bold text-white'>Google</div>
        <div className='text-3xl font-bold text-white'>Google</div>
        <div className='text-3xl font-bold text-white'>Google</div>
        <div className='text-3xl font-bold text-white'>Google</div>
      </div>
    </div>
  );
};

export default FeatureOn;
