// This is a global layout component that wraps the entire application.
// It includes the theme provider, Google Analytics, and the Toaster component.

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/utils';
import NavbarTwo from '@/components/landing-page/NavbarTwo';

const font = Inter({ subsets: ['latin'] });

const bg = Bricolage_Grotesque({ subsets: ['latin'] });

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://builderkit.ai'),
  title: 'AI Photo Generator | PicAI',
  description: 'Boilerplate for Headshot Generator',
  openGraph: {
    type: 'website',
    title: 'Headshot Generator - BuilderKit',
    description: 'Boilerplate for Headshot Generator',
    images: '/og-image.png',
    url: 'https://builderkit.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Headshot Generator - BuilderKit',
    description: 'Boilerplate for Headshot Generator',
    images: '/og-image.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Analytics for tracking user interactions */}
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`}
      />
      <Script strategy='lazyOnload' id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}', {
          page_path: window.location.pathname,
          });
      `}
      </Script>

      <html lang='en'>
        <body className={cn(bg.className, 'bg-black')}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
