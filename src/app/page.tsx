// src/app/page.tsx
'use client';

import HeroSectionHome from '@/components/Home/HeroSectionHome';
import BurgerOffer from '@/components/Home/BurgerOffer';
import ContactSection from '@/components/Home/ContactSection';
import Marquee from '@/components/Home/Marquee';
import GallerySection from '@/components/Home/GallerySection';


export default function Home() {
  return (
    <>
      <BurgerOffer />
      <HeroSectionHome />
      <Marquee />
      <GallerySection />
      <ContactSection />
    </>
  );
}

