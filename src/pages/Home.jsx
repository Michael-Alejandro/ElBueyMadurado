import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50 z-10" />
        <div className="absolute inset-0">
          {/* Placeholder para imagen hero */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <span className="text-gray-500 font-serif text-2xl">Imagen del Hero aquí</span>
          </div>
        </div>

        <motion.div
          className="relative z-20 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            No hablamos de comida rápida…
            <br />
            <span className="text-wine-600">…hablamos de alta cocina a domicilio.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8"
            variants={itemVariants}
          >
            Carne madurada, ingredientes locales y un sabor que trasciende.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Link to="/carta" className="btn-primary">
              Ver Carta
            </Link>
            <Link to="/sobre-nosotros" className="btn-secondary">
              Sobre Nosotros
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Concepto Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">¿Quiénes Somos?</h2>
          <p className="section-subtitle text-center">
            En El Buey Madurado creemos en la magia de la cocina bien hecha. Cada plato cuenta una historia de paciencia, técnica y pasión. Nuestras hamburguesas no son simples sándwiches: son experiencias gastronómicas que elevan lo cotidiano a lo extraordinario.
          </p>

          <motion.div
            className="mt-12 grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Carne Madurada",
                desc: "Seleccionada cuidadosamente y madurada en nuestras cámaras especiales para alcanzar la perfección.",
              },
              {
                title: "Ingredientes Frescos",
                desc: "Pan artesanal, vegetales locales y productos premium que reflejan nuestro compromiso con la calidad.",
              },
              {
                title: "Cocina Honesta",
                desc: "Sin artificios, sin prisas. Solo técnica, fuego y la pasión de quienes hacen que cada bocado sea memorable.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-wine-600 transition"
                variants={itemVariants}
              >
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-wine-600 text-white py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Haz tu pedido online
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Disfruta de la experiencia de El Buey Madurado desde la comodidad de tu hogar.
          </p>
          <a href="#" className="bg-white text-wine-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Pedir Ahora
          </a>
        </motion.div>
      </section>
    </div>
  );
}
