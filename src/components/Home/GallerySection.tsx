'use client';

import { useEffect, useMemo, useState } from 'react';

const SLIDE_MS = 3200;

type Slide = { src: string; alt: string };

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GallerySection() {
  // Base (orden fijo)
  const baseImages: Slide[] = useMemo(
    () => [
      { src: '/assets/images/local1img.jpeg', alt: 'El local' },
      { src: '/assets/images/local2img.jpeg', alt: 'El local' },
      { src: '/assets/images/local3img.jpeg', alt: 'El local' },
      { src: '/assets/images/carne1.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne2.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne3.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne4.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne5.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne6.jpeg', alt: 'Carne' },
    ],
    []
  );

  // 👇 Imágenes render inicial = baseImages (determinista)
  const [images, setImages] = useState<Slide[]>(baseImages);
  const [index, setIndex] = useState(0);

  // 👇 Mezcla SOLO en cliente tras montar (evita hydration mismatch)
  useEffect(() => {
    setImages(shuffle(baseImages));
    setIndex(0);
  }, [baseImages]);

  // Intervalo del carrusel
  useEffect(() => {
    if (images.length === 0) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, [images]);

  return (
    <section className="w-full px-4 md:px-6 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        {/* Header fino */}
        <div className="mb-5 md:mb-7">
          <div className="mt-2 flex items-end justify-between gap-4">
            <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
              El producto mas exlusivo.
              <span className="text-amber-500"> Todo por vosotros.</span>
            </h2>
          </div>

          <p className="text-white/70 text-sm md:text-base mt-3 max-w-2xl">
            Maduración · Experiencia · Pasión
          </p>
        </div>

        {/* Carrusel “fino” */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-black">
            {/* Crossfade */}
            {images.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className={[
                  'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
                  i === index ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
                loading={i === index ? 'eager' : 'lazy'}
              />
            ))}

            {/* Overlays finos */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

            {/* Corazón estilo Instagram (sin click, sincronizado con slide) */}
            <div className="absolute right-1 bottom-1 md:right-4 md:bottom-4 pointer-events-none z-10">
              <div className="relative h-16 w-16 md:h-20 md:w-20 flex items-center justify-center">
                <span key={index} className="ig-heart text-3xl md:text-4xl">
                  ❤️
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* línea de texto móvil */}
        <p className="md:hidden text-white/60 text-sm mt-4">
          Un vistazo rápido al local y nuestro producto. Puro disfrute.
        </p>
      </div>
    </section>
  );
}
