'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import ModalTrainModel from '../model/ModalTrainModel';

interface NavTitleProps {}

const NavCta: FC<NavTitleProps> = () => {
  const pathname = usePathname();

  const title =
    pathname === '/home' ? (
      <ModalTrainModel buttonText='Train Model' />
    ) : pathname === '/history' ? (
      ''
    ) : pathname === '/pricing' ? (
      ''
    ) : pathname === '/settings' ? (
      ''
    ) : (
      ''
    );

  return <div className='text-lg font-semibold text-default'>{title}</div>;
};

export default NavCta;
