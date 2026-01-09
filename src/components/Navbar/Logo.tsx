// src/components/Navbar/Logo.tsx
// src/components/Navbar/Logo.tsx
'use client';

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <CldImage
        src="Logo-Buey_t9mc4b"
        alt="El Buey Madurado"
        width={80}
        height={80}
        className="object-contain"
      />
      {/* Nombre del Restaurante */}
      <div className="flex flex-col">
        <span className="text-amber-400 font-bold text-sm md:text-base leading-tight">
          EL
        </span>
        <span className="text-amber-400 font-bold text-base md:text-lg leading-tight">
          BUEY
        </span>
        <span className="text-amber-400 font-bold text-xs md:text-sm leading-tight">
          MADURADO
        </span>
      </div>
    </Link>
  );
}