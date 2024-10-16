// This is the entry component for the landing page of the application.

import Footer from '@/components/landing-page/Footer';
import Hero from '@/components/landing-page/Hero';
import HeroTwo from '@/components/landing-page/HeroTwo';
import InfiniteMovingCards from '@/components/landing-page/InfiniteMovingCards';
import Navbar from '@/components/landing-page/Navbar';
import NavbarTwo from '@/components/landing-page/NavbarTwo';
import Video from '@/components/landing-page/Video';

export default async function Home() {
  return (
    <main className='max-w-7xl mx-auto bg-[#000] min-h-screen'>
      <NavbarTwo />
      <HeroTwo />
      <InfiniteMovingCards />
      <Video />
    </main>
  );
}
