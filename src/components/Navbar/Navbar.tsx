// components/Navbar/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import NavLink from './NavLink';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/carta', label: 'Carta' },
  { href: '/reservas', label: 'Reservar' },
  //{ href: '/sorteo', label: 'Sorteo' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const bgClass = scrolled || menuOpen ? 'bg-black shadow-md' : 'bg-black/50';

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${bgClass}`}
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
