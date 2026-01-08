// src/app/page.tsx
'use client';

import HeroSectionHome from '@/components/Home/HeroSectionHome';
import ContactSection from '@/components/Home/ContactSection';
import Marquee from '@/components/Home/Marquee';

export default function Home() {
  return (
    <>
      <HeroSectionHome />
      <Marquee />
      <ContactSection />
    </>
  );
}

