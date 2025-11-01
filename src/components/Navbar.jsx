import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-wine-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
            EB
          </div>
          <span className="font-serif text-xl font-bold text-gray-900 hidden md:block">
            El Buey Madurado
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-wine-600 transition-colors font-medium"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/carta"
              className="text-gray-700 hover:text-wine-600 transition-colors font-medium"
            >
              Carta
            </Link>
          </li>
          <li>
            <Link
              to="/sobre-nosotros"
              className="text-gray-700 hover:text-wine-600 transition-colors font-medium"
            >
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className="text-gray-700 hover:text-wine-600 transition-colors font-medium"
            >
              Contacto
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-wine-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/carta"
            className="block py-2 text-gray-700 hover:text-wine-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Carta
          </Link>
          <Link
            to="/sobre-nosotros"
            className="block py-2 text-gray-700 hover:text-wine-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sobre Nosotros
          </Link>
          <Link
            to="/contacto"
            className="block py-2 text-gray-700 hover:text-wine-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contacto
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
