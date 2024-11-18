// This is the entry component for the landing page of the application.

import HeroTwo from '@/components/landing-page/HeroTwo';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import NavbarTwo from '@/components/landing-page/NavbarTwo';
import Video from '@/components/landing-page/Video';
import { testimonials } from '@/assets/data/data';
import Transformations from '@/components/landing-page/Transformations';
// import PricingTwo from '@/components/landing-page/PricingTwo';
import FaqsTwo from '@/components/landing-page/FaqsTwo';
import CtaSection from '@/components/landing-page/CtaSection';
import FooterTwo from '@/components/landing-page/FooterTwo';
import PricingFour from '@/components/landing-page/PricingFour';
import AiBadge from '@/components/landing-page/AiBadge';

export default async function Home() {
  return (
    <main className='mx-auto bg-black min-h-screen'>
      <NavbarTwo />
      <HeroTwo />
      <InfiniteMovingCards items={testimonials} direction='left' speed='normal' />
      <Transformations />
      <Video />
      {/* <Pricing /> */}
      {/* <PricingTwo /> */}
      <PricingFour />
      <FaqsTwo />
      <CtaSection />
      <AiBadge />
      <FooterTwo />
    </main>
  );
}
