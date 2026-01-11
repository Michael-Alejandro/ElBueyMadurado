'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
  const baseImages: Slide[] = useMemo(
    () => [
      { src: '/assets/images/local1img.jpeg', alt: 'El local' },
      { src: '/assets/images/local2img.jpeg', alt: 'El local' },
      { src: '/assets/images/local3img.jpeg', alt: 'El local' },
      { src: '/assets/images/carne1.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne2.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne3.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne4.PNG', alt: 'Carne' },
      { src: '/assets/images/carne5.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne6.jpeg', alt: 'Carne' },
      { src: '/assets/images/carne7.PNG', alt: 'Carne' },
      { src: '/assets/images/carne9.PNG', alt: 'Carne' },
      { src: '/assets/images/carne10.jpeg', alt: 'Carne' },

    ],
    []
  );

  const [images, setImages] = useState<Slide[]>(baseImages);

  // Desktop crossfade
  const [index, setIndex] = useState(0);

  // Mobile swipe + autoplay
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pauseRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  // Mezcla solo en cliente
  useEffect(() => {
    setImages(shuffle(baseImages));
    setIndex(0);
  }, [baseImages]);

  // Autoplay desktop
  useEffect(() => {
    if (!images.length) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [images]);

  // Autoplay móvil (scroll)
  useEffect(() => {
    if (!images.length) return;

    const id = window.setInterval(() => {
      if (pauseRef.current) return;

      setMobileIndex((prev) => {
        const next = (prev + 1) % images.length;
        const el = scrollerRef.current;
        if (el) {
          el.scrollTo({
            left: next * el.clientWidth,
            behavior: 'smooth',
          });
        }
        return next;
      });
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, [images.length]);

  // Pausar autoplay cuando el usuario desliza
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onUserInteract = () => {
      pauseRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = window.setTimeout(() => {
        pauseRef.current = false;
      }, 2500);
    };

    const onScroll = () => {
      const w = el.clientWidth || 1;
      setMobileIndex(Math.round(el.scrollLeft / w));
      onUserInteract();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('touchstart', onUserInteract, { passive: true });
    el.addEventListener('pointerdown', onUserInteract, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchstart', onUserInteract);
      el.removeEventListener('pointerdown', onUserInteract);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [images.length]);

  return (
    <section className="w-full px-4 md:px-6 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-5 md:mb-7">
          <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
            El producto mas exclusivo.
            <span className="text-amber-500"> Todo por vosotros.</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-2xl">
            Maduración · Experiencia · Pasión
          </p>
        </div>

        {/* ===== FRAME REDONDO ===== */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl">

          {/* ===== MÓVIL ===== */}
          <div className="md:hidden -mx-4">
            <div
              ref={scrollerRef}
              className="
                flex overflow-x-auto overflow-y-hidden
                snap-x snap-mandatory
                scroll-smooth
                [scrollbar-width:none]
                overscroll-x-contain
                touch-pan-y touch-manipulation
              "
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
              `}</style>

              {images.map((img) => (
                <div key={img.src} className="hide-scrollbar w-full flex-none snap-center">
                  <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-black">
                    {/* Fondo blur */}
                    <img
                      src={img.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-55"
                      loading="lazy"
                    />

                    {/* Imagen real */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>


          </div>

          {/* ===== DESKTOP ===== */}
          <div className="hidden md:block">
            <div className="relative w-full aspect-[16/7] bg-black">
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
                  />
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="md:hidden text-white/60 text-sm mt-4">
           Un vistazo rápido al local y nuestro producto. Puro disfrute.
        </p>
      </div>
    </section>
  );
}
