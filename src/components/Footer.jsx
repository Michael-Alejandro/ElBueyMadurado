import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-wine-600 font-bold text-lg mb-4">El Buey Madurado</h3>
            <p className="text-sm">
              Alta cocina a domicilio. Carne madurada, ingredientes locales y un sabor que trasciende.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-wine-600 font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-wine-600 transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/carta" className="hover:text-wine-600 transition">
                  Carta
                </a>
              </li>
              <li>
                <a href="/sobre-nosotros" className="hover:text-wine-600 transition">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-wine-600 transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-wine-600 font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-wine-600 rounded-full flex items-center justify-center hover:bg-wine-700 transition"
              >
                <span className="text-white">f</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-wine-600 rounded-full flex items-center justify-center hover:bg-wine-700 transition"
              >
                <span className="text-white">i</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            © {currentYear} <span className="text-wine-600 font-semibold">El Buey Madurado</span> — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
