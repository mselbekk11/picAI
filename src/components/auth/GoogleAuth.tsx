// This component provides Google authentication using Supabase's auth UI.
// It is configured to redirect users to a specified callback URL upon successful authentication.
// The appearance of the auth button is customized according to the application's theme.

'use client';

import { supabaseBrowserClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useTheme } from 'next-themes';

export default function GoogleAuth() {
  const supabase = supabaseBrowserClient();
  const { theme } = useTheme();

  // Define theme-dependent variables
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const buttonBackground = theme === 'dark' ? '#2A2A2A' : '#F7F7F7';
  const buttonBackgroundHover = theme === 'dark' ? '#2A2A2A' : '#F7F7F7';
  const buttonBorder = theme === 'dark' ? '#2A2A2A' : '#F7F7F7';

  // Ensure the redirect URL is configured correctly in the Supabase project settings.
  // Incorrect configuration can lead to failed authentication attempts or security vulnerabilities.
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
  return (
    <div className='w-full'>
      <Auth
        supabaseClient={supabase}
        onlyThirdPartyProviders={true}
        providers={['google']}
        redirectTo={redirectUrl}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                defaultButtonText: textColor,
                defaultButtonBackground: buttonBackground,
                defaultButtonBackgroundHover: buttonBackgroundHover,
                defaultButtonBorder: buttonBorder,
              },
              radii: {
                borderRadiusButton: '6px',
              },
            },
          },
        }}
      />
    </div>
  );
}

// You can also implement rate limiting or add additional logging for authentication attempts.
// This can help mitigate brute force attacks and provide insights into potential security threats.
