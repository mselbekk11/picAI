import { SelectTheme } from '@/components/dashboard/Navbar/SelectTheme';
import { SelectThemeTwo } from '@/components/dashboard/Navbar/SelectThemeTwo';
import { Card, CardContent } from '@/components/ui/card';
import { getUserDetails } from '@/utils/supabase/server';

const Settings = async () => {
  const user = await getUserDetails();
  return (
    <div className='mt-2'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <p className='text-xs'>Display Name: </p>
              <p className='text-lg font-medium'>{user?.user_metadata?.full_name}</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs'>Email Address: </p>
              <p className='text-lg font-medium'>{user?.email}</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs'>Current Plan: </p>
              <p className='text-lg font-medium'>Free</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs mb-2'>Theme: </p>
              {/* <SelectTheme /> */}
              <SelectThemeTwo />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
