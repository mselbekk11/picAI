// Layout component that includes the Navbar and ensures user authentication

import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Navbar from '@/components/dashboard/Navbar/Navbar';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/utils';
import { CreditsProvider } from '@/context/CreditsContext';
const font = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
};

// Server-side component to check user authentication and render the Navbar
export default async function Layout({ children }: Props) {
  const user = await getUserDetails();

  // Redirects to login page if user is not authenticated
  if (user == null) {
    redirect('/login');
  }

  return (
    // Wraps a ThemeProvider around the Navbar and children components. It allows user to switch between light and dark themes.
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <CreditsProvider>
        <div className={cn(font.className)}>
          <div className='h-screen flex'>
            <div className='w-80 hidden md:flex flex-col'>
              <Sidebar />
            </div>

            <div className='w-full flex flex-col'>
              <Navbar />
              <div className='flex-1 overflow-auto'>{children}</div>
            </div>
          </div>
        </div>
      </CreditsProvider>
    </ThemeProvider>
  );
}

// className={cn(bg.className)}

// h-screen flex
