// This is the entry component for the landing page of the application.

import HeroTwo from '@/components/landing-page/HeroTwo';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import NavbarTwo from '@/components/landing-page/NavbarTwo';
import Video from '@/components/landing-page/Video';
import { testimonials } from '@/assets/data/data';
import Transformations from '@/components/landing-page/Transformations';
import PricingTwo from '@/components/landing-page/PricingTwo';
import Faq from '@/components/landing-page/FAQ';
import CtaSection from '@/components/landing-page/CtaSection';
import Footer from '@/components/landing-page/Footer';
import FooterTwo from '@/components/landing-page/FooterTwo';

export default async function Home() {
  return (
    <main className='mx-auto bg-[#000] min-h-screen'>
      <NavbarTwo />
      <HeroTwo />
      <InfiniteMovingCards items={testimonials} direction='left' speed='slow' />
      <Video />
      <Transformations />
      {/* <Pricing /> */}
      <PricingTwo />
      <Faq />
      <CtaSection />
      <FooterTwo />
    </main>
  );
}
