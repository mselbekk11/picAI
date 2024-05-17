import Logo from '@/components/Logo';
import SidebarItem from './SidebarItem';
import DropdownAccount from './DropdownAccount';
import SidebarUpgradePlan from './SidebarUpgradePlan';
import ModalTrainModel from '@/components/dashboard/generate/ModalTrainModel';
import { SidebarRoutes } from './content';

const Sidebar = () => {
  return (
    <div className='h-full border rounded-xl p-2.5 flex flex-col justify-between'>
      <div>
        <div className='mb-6'>
          <Logo />
        </div>
        <div className='mb-3'>
          <ModalTrainModel buttonText='Train Model' />
        </div>

        <div className='space-y-1'>
          {SidebarRoutes.map((route, index) => (
            <SidebarItem key={index} route={route} />
          ))}
        </div>
      </div>

      <div className='space-y-3'>
        <SidebarUpgradePlan />
        <DropdownAccount />
      </div>
    </div>
  );
};

export default Sidebar;
