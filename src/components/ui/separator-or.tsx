import { FC } from 'react';

interface SeparatorOrProps {}

const SeparatorOr: FC<SeparatorOrProps> = () => {
  return (
    <div className='w-full flex items-center gap-2'>
      <hr className='w-1/2' />
      <span>or</span>
      <hr className='w-1/2' />
    </div>
  );
};

export default SeparatorOr;
