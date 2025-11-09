import { motion } from "framer-motion";
import sobreNosotrosImg from "../../img/sobre-nosotros.jpeg";

export default function SobreNosotros() {
  const storyBlocks = [
    {
      title: "Nuestra Esencia",
      content:
        "En El Buey Madurado no buscamos ser una hamburguesería más: queremos elevar la experiencia gastronómica de nuestra ciudad. Creemos en una cocina donde el respeto por el producto se nota en cada bocado, donde el fuego, la paciencia y la técnica se unen para transformar la carne en algo excepcional.",
      position: "left",
    },
    {
      title: "Maduración Artesanal",
      content:
        "Trabajamos solo con carne madurada de calidad superior. Nuestras cámaras de maduración mantienen las condiciones perfectas de temperatura y humedad durante semanas. Este proceso transforma la carne en una experiencia sensorial incomparable: más tierna, más jugosa, más auténtica.",
      position: "right",
    },
    {
      title: "Ingredientes Locales",
      content:
        "Creemos en la proximidad y en el comercio justo. Nuestro pan artesanal viene de hornos cercanos, nuestras verduras de productores locales comprometidos con la sostenibilidad. Cada ingrediente cuenta una historia de dedicación y calidad.",
      position: "left",
    },
    {
      title: "Técnica y Pasión",
      content:
        "Nuestro equipo en cocina no son simplemente cocineros: son artesanos que dominan cada técnica, que entienden el fuego como un instrumento de precisión, que transforman ingredientes en emociones. La cocina honesta requiere tiempo, cuidado y amor.",
      position: "right",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={sobreNosotrosImg}
            alt="Carne madurada"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/60" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Museo de la Carne
            <br />
            <span className="text-wine-600 block">Digital</span>
          </motion.h1>

          <motion.p
            className="text-2xl text-gray-100 max-w-2xl font-light leading-relaxed"
            variants={itemVariants}
          >
            Donde la tradición, la técnica y la pasión convergen en cada plato. Bienvenido a la filosofía de El Buey Madurado.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Blocks */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-32 space-y-32">
        {storyBlocks.map((block, idx) => (
          <motion.div
            key={idx}
            className={`grid md:grid-cols-2 gap-16 items-center ${
              block.position === "right" ? "md:grid-cols-2" : "md:grid-cols-2"
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contenido de texto */}
            <motion.div
              className={block.position === "right" ? "md:order-2" : ""}
              initial={{
                opacity: 0,
                x: block.position === "left" ? -50 : 50,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">
                {block.title}
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-wine-600 to-wine-700 mb-8 rounded-full" />
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                {block.content}
              </p>
            </motion.div>

            {/* Placeholder para imagen */}
            <motion.div
              className={`relative h-96 rounded-3xl overflow-hidden shadow-2xl ${
                block.position === "right" ? "md:order-1" : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* Valores */}
      <section className="relative py-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-wine-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              Nuestros Valores
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-wine-600 to-wine-700 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Principios que guían cada decisión en El Buey Madurado
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Calidad Premium",
                icon: "★",
                desc: "Solo los mejores productos, sin excepciones ni compromisos.",
              },
              {
                title: "Sostenibilidad",
                icon: "♻",
                desc: "Compromiso con el medio ambiente y las comunidades locales.",
              },
              {
                title: "Experiencia",
                icon: "♥",
                desc: "Cada detalle pensado para tu satisfacción y deleite.",
              },
            ].map((valor, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-wine-600/40 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {valor.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                  {valor.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {valor.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <p className="text-4xl md:text-5xl font-serif text-gray-900 italic leading-tight">
            "Maduramos la carne, pero también el gusto por lo auténtico."
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-wine-600 to-wine-700 mx-auto rounded-full" />
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            En El Buey Madurado, cada hamburguesa es un acto de amor por la cocina bien hecha. Te invitamos a ser parte de esta experiencia única donde la tradición se encuentra con la innovación, donde cada ingrediente cuenta una historia, y donde cada bocado te transporta a un viaje gastronómico sin igual.
          </p>
          <motion.a
            href="/contacto"
            className="inline-block mt-8 bg-wine-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contáctanos Hoy
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
