// Layout component that includes the Navbar and ensures user authentication

import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Navbar from '@/components/dashboard/Navbar/Navbar';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/utils';
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
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
      <div className={cn(font.className)}>
        <div className='h-screen flex'>
          <div className='w-80 hidden md:flex flex-col'>
            <Sidebar />
          </div>

          <div className='w-full overflow-auto px-4'>
            <Navbar />
            <div className='max-w-7xl'>{children}</div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

// className={cn(bg.className)}

// h-screen flex
