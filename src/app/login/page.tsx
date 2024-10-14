// This page represents the login screen of the application.
// It displays a central form allowing users to log in or register either through email or Google authentication.
// The application name is dynamically fetched from the config and displayed at the top.
// The `EmailAuth` and `GoogleAuth` components are used here for handling the respective authentication methods.

import EmailAuth from '@/components/auth/EmailAuth';
import GoogleAuth from '@/components/auth/GoogleAuth';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Aperture } from 'lucide-react';

export default function Login() {
  return (
    <div className='h-screen flex'>
      <div className='w-full flex flex-col items-center justify-center px-6'>
        <Card className='w-full sm:max-w-md p-6 text-center'>
          <div className='flex items-center gap-2 w-full justify-center mb-4'>
            {/* <Image src={logoSrc} width={150} height={128} alt='logo' /> */}
            <Aperture color='#af40e2' />
            <h1 className='text-2xl font-bold text-[#af40e2]'>PicAI</h1>
          </div>
          <div className='text-2xl md:text-4xl font-medium mb-6 text-center space-y-2'>
            <p>AI Photo Generator </p>
            {/* <p className='text-lg'>by picAI.so</p> */}
          </div>
          <h2 className='text-default text-sm mt-3 mb-9 font-medium'>Login or register with your email</h2>
          <div className='w-full sm:max-w-md flex flex-col gap-6 items-center'>
            <GoogleAuth />
            <Separator className='w-3/4' />
            <EmailAuth />
          </div>
        </Card>
      </div>
    </div>
  );
}
