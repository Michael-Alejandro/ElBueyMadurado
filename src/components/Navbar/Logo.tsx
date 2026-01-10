'use client';

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export default function Logo() {
  const [animKey, setAnimKey] = useState(0);

  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      onClick={() => setAnimKey((k) => k + 1)}
      aria-label="Ir al inicio"
    >
      <CldImage
        src="Logo-Buey_t9mc4b"
        alt="El Buey Madurado"
        width={64}
        height={64}
        className="object-contain"
      />

      {/* Nombre del Restaurante */}
      <div className="flex flex-col overflow-hidden">
        <span
          key={`el-${animKey}`}
          className="logo-slide logo-slide-1 text-amber-400 font-bold text-xs md:text-base leading-tight"
        >
          EL
        </span>
        <span
          key={`buey-${animKey}`}
          className="logo-slide logo-slide-2 text-amber-400 font-bold text-sm md:text-lg leading-tight"
        >
          BUEY
        </span>
        <span
          key={`madurado-${animKey}`}
          className="logo-slide logo-slide-3 text-amber-400 font-bold text-[10px] md:text-sm leading-tight"
        >
          MADURADO
        </span>
      </div>
    </Link>
  );
}
