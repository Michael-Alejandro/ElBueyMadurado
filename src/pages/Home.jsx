import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../../img/hamburgesa-inicio.png";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-start px-6 md:px-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={heroImg}
            alt="Hamburguesa destacada"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-gray-900/40" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight tracking-tight"
            variants={itemVariants}
          >
            No hablamos de comida rápida…
            <br />
            <span className="text-wine-600 block">…hablamos de alta cocina</span>
            <span className="text-wine-600">a domicilio.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-100 mb-8 max-w-xl font-light leading-relaxed"
            variants={itemVariants}
          >
            Carne madurada, ingredientes locales y un sabor que trasciende.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Link
              to="/carta"
              className="btn-primary shadow-lg hover:shadow-xl hover:shadow-wine-600/20"
            >
              Ver Carta
            </Link>
            <Link
              to="/sobre-nosotros"
              className="btn-secondary shadow-lg hover:shadow-wine-600/20"
            >
              Sobre Nosotros
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Concepto Section */}
      <section className="max-w-6xl mx-auto px-6 py-28 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">¿Quiénes Somos?</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-wine-600 to-wine-700 mx-auto mb-8 rounded-full" />
          <p className="section-subtitle text-center max-w-3xl mx-auto text-lg">
            En El Buey Madurado creemos en la magia de la cocina bien hecha. Cada plato cuenta una historia de paciencia, técnica y pasión.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: "🥩",
              title: "Carne Madurada",
              desc: "Seleccionada cuidadosamente y madurada en nuestras cámaras especiales para alcanzar la perfección.",
            },
            {
              icon: "🌾",
              title: "Ingredientes Frescos",
              desc: "Pan artesanal, vegetales locales y productos premium que reflejan nuestro compromiso.",
            },
            {
              icon: "👨‍🍳",
              title: "Cocina Honesta",
              desc: "Sin artificios, sin prisas. Solo técnica, fuego y pasión en cada bocado.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-wine-600/30 shadow-sm hover:shadow-lg transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wine-600 via-wine-700 to-wine-800 -z-10" />
        <div className="absolute inset-0 opacity-10 -z-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Haz tu pedido online
          </h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed font-light">
            Disfruta de la experiencia de El Buey Madurado desde la comodidad de tu hogar.
          </p>
          <motion.a
            href="#"
            className="inline-block bg-white text-wine-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-wine-600/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pedir Ahora →
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
