import MobileSidebar from '../sidebar/MobileSidebar';
import NavTitle from './NavTitle';
import Credits from './Credits';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-muted/40 h-14 gap-4 border-b lg:h-[60px] lg:px-6'>
      <NavTitle />

      <div className='flex items-center gap-5'>
        <div className='flex items-center'>
          {/* <SelectTheme /> */}
          {/* <NavCta /> */}
          <Credits />

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
