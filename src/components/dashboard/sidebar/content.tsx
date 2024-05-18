import { RiLayoutGridFill } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';

export const sidebarRoutes = [
  {
    icon: <RiLayoutGridFill className='size-5' />,
    label: 'Home',
    path: '/home',
  },
  {
    icon: <MdHistory className='size-5' />,
    label: 'History',
    path: '/history',
  },
];
