// This is the entry component for the landing page of the application.

import Footer from '@/components/landing-page/Footer';
import Hero from '@/components/landing-page/Hero';
import Navbar from '@/components/landing-page/Navbar';

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className='bg-[#000]'>
        <div className='max-w-6xl mx-auto pt-10'>
          <Hero />
          <Footer />
        </div>
      </div>
    </>
  );
}
