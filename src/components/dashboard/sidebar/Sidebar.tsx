import Logo from '@/components/Logo';
import SidebarItem from './SidebarItem';
import UserButton from './UserButton';
import SidebarUpgradePlan from './SidebarUpgradePlan';
import ModalTrainModel from '@/components/dashboard/generate/ModalTrainModel';

const Sidebar = () => {
  return (
    <div className='h-full border border-[#F2F2F2] dark:border-[#272626] rounded-xl p-2.5 flex flex-col justify-between'>
      <div>
        <div className='mb-6'>
          <Logo />
        </div>
        <div className='mb-3'>
          <ModalTrainModel buttonText='Train Model' />
        </div>
        <SidebarItem />
      </div>

      <div className='space-y-3'>
        <SidebarUpgradePlan />
        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
