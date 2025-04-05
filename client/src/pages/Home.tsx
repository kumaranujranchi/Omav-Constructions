import Hero from '@/components/home/Hero';
import Introduction from '@/components/home/Introduction';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonials from '@/components/home/Testimonials';
import HowItWorks from '@/components/home/HowItWorks';
import ClientSolutions from '@/components/home/ClientSolutions';
import ToolsResources from '@/components/home/ToolsResources';
import Contact from '@/components/home/Contact';
import CTABanner from '@/components/home/CTABanner';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Omav Construction - Building Your Vision with Quality and Trust';
  }, []);

  return (
    <>
      <Hero />
      <Introduction />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <Testimonials />
      <HowItWorks />
      <ClientSolutions />
      <ToolsResources />
      <Contact />
      <CTABanner />
    </>
  );
};

export default Home;
