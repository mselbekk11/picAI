// This Layout is specific to the Generate page.
// It ensures that a user is authenticated before rendering children components.
// If not authenticated, it redirects to the login page.

import Navbar from '@/components/generate/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { getUserDetails } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await getUserDetails();

  if (user == null) {
    redirect('/login');
  }
  return (
    // Wraps a ThemeProvider around the Navbar and children components. It allows user to switch between light and dark themes.
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
