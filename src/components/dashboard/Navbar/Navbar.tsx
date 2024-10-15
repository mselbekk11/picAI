import { SelectTheme } from './SelectTheme';
import MobileSidebar from '../sidebar/MobileSidebar';
import { RxExternalLink } from 'react-icons/rx';
import Link from 'next/link';
import NavTitle from './NavTitle';
import { Button } from '@/components/ui/button';
import NavCta from './NavCta';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between my-6'>
      <NavTitle />

      <div className='flex items-center gap-5'>
        <div className='flex items-center'>
          {/* <SelectTheme /> */}
          <NavCta />

          <div className='hidden md:flex items-center gap-3'></div>
        </div>
        <div className='inline-block md:hidden'>
          <MobileSidebar />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
