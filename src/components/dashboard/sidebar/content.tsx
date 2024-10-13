// import { RiLayoutGridFill } from 'react-icons/ri';
// import { MdHistory } from 'react-icons/md';
import { House } from 'lucide-react';
import { Image } from 'lucide-react';
import { Settings } from 'lucide-react';

export const sidebarRoutes = [
  {
    // icon: <RiLayoutGridFill className='size-5' />,
    icon: <House className='size-5' />,
    label: 'Home',
    path: '/home',
  },
  {
    icon: <Image className='size-5' />,
    label: 'Images',
    path: '/images',
  },
];

export const bottomSidebarRoutes = [
  {
    // icon: <RiLayoutGridFill className='size-5' />,
    icon: <Settings className='size-5' />,
    label: 'Account Settings',
    path: '/settings',
  },
];
