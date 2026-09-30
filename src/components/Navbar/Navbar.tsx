// components/Navbar/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import NavLink from './NavLink';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/carta', label: 'Carta' },
  { href: '/reservas', label: 'Reservar' },
  { href: '/sorteo', label: 'Descuentos' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/contacto', label: 'Contacto' },
] as const;

// Recorrido seguido (en px) hacia abajo para esconder el Navbar en la carta, y
// hacia arriba para mostrarlo. Se mide la distancia, no la velocidad, para que
// también reaccione al deslizar despacio con el dedo.
const HIDE_AFTER_SCROLL = 10;
const SHOW_AFTER_SCROLL = 10;
// No se esconde hasta pasar esta posición, para que al entrar se vea completo
const HIDE_FROM_Y = 80;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  // Posición donde empezó el movimiento actual (último cambio de dirección)
  const directionStartY = useRef(0);
  const lastDirection = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Solo en la carta se esconde al bajar y reaparece al subir, para dejar más
  // espacio a la barra de categorías y a los platos. En el resto, siempre fijo.
  const hideOnScroll = pathname === '/carta';
  const isHidden = hideOnScroll && navHidden && !menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const direction = Math.sign(scrollDelta);

      // Al cambiar de dirección, el recorrido se empieza a medir desde ahí
      if (direction !== 0 && direction !== lastDirection.current) {
        directionStartY.current = lastScrollY.current;
        lastDirection.current = direction;
      }
      const travelled = currentScrollY - directionStartY.current;

      setScrolled(currentScrollY > 50);

      if (currentScrollY < 60) {
        setNavHidden(false);
      } else if (!menuOpen && travelled > HIDE_AFTER_SCROLL && currentScrollY > HIDE_FROM_Y) {
        setNavHidden(true);
      } else if (travelled < -SHOW_AFTER_SCROLL) {
        setNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Al recargar o cambiar de página, el navegador puede restaurar la posición
    // sin disparar scroll: partimos de la posición real y visible, para no verlo
    // transparente a mitad de página ni esconderlo en el primer scroll.
    lastScrollY.current = window.scrollY;
    directionStartY.current = window.scrollY;
    lastDirection.current = 0;
    setNavHidden(false);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen, pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Avisa a los elementos fijos que van debajo del Navbar (ver globals.css)
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--site-header-visible-offset',
      isHidden ? '0px' : 'var(--site-header-height)'
    );

    return () => {
      document.documentElement.style.setProperty(
        '--site-header-visible-offset',
        'var(--site-header-height)'
      );
    };
  }, [isHidden]);

  const bgClass = scrolled || menuOpen ? 'bg-black shadow-md' : 'bg-black/50';
  const visibilityClass = isHidden ? '-translate-y-full' : 'translate-y-0';

  return (
    <nav
      className={`site-header fixed left-0 top-0 z-50 w-full ${bgClass} ${visibilityClass}`}
    >
      <div className="flex h-20 w-full items-center justify-between px-4">
        <Logo />

        <ul className="hidden flex-1 items-center justify-center gap-6 text-base font-semibold text-gray-200 md:flex lg:gap-8 lg:text-lg">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </ul>

        <div className="md:hidden">
          <button
            className="p-4 text-4xl text-white transition-colors duration-200 hover:text-amber-500 md:text-5xl"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="text-amber-500">&times;</span>
            ) : (
              <span>&#9776;</span>
            )}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`fixed right-0 top-16 h-auto overflow-hidden text-white transition-all duration-500 ease-in-out md:hidden ${bgClass} ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ minWidth: '220px', maxWidth: '280px' }}
      >
        <ul
          className="flex flex-col items-start space-y-4 p-6"
          onClick={() => setMenuOpen(false)}
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
}
