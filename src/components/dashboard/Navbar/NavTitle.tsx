'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavTitleProps {}

const NavTitle: FC<NavTitleProps> = () => {
  const pathname = usePathname();

  const title =
    pathname === '/home'
      ? 'Models'
      : pathname === '/images'
        ? 'Images'
        : pathname === '/pricing'
          ? 'Pricing'
          : pathname === '/settings'
            ? 'Account Settings'
            : pathname === '/billing'
              ? 'Manage Billing'
              : 'Headshot Generator';

  return <div className='text-md text-default'>{title}</div>;
};

export default NavTitle;
