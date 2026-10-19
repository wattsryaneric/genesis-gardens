import React from 'react';
import HeroSection from '../components/home/HeroSection.jsx';
import AboutSnippet from '../components/home/AboutSnippet.jsx';
import ServiceSnapshot from '../components/home/ServiceSnapshot.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSnippet />
      <ServiceSnapshot />
      <Testimonials />
      <CTABanner
        heading="There's a place here for you."
        description="Whether you're planning something big or just need to breathe for a while — reach out. We'd love to welcome you."
        variant="dark"
      />
    </>
  );
}
