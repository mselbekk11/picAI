import Features from '@/components/landing-page/Features';
import FeaturedOn from '@/components/landing-page/FeaturedOn';
import Footer from '@/components/landing-page/Footer';
import FAQs from '@/components/landing-page/FAQs';
import Hero from '@/components/landing-page/Hero';
import Pricing from '@/components/landing-page/Pricing';
import WorkFlow from '@/components/landing-page/WorkFlow';
import Navbar from '@/components/landing-page/navbar/Navbar';

export default async function Home() {
  return (
    <div className='bg-[#031614]'>
      <Navbar />
      <div className='max-w-6xl mx-auto pt-10'>
        <Hero />
        <FeaturedOn />
        <Features />
        <WorkFlow />
        <Pricing />
        <FAQs />
        <Footer />
      </div>
    </div>
  );
}
