import { motion } from "framer-motion";

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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 z-10" />
        <div className="absolute inset-0">
          {/* Placeholder para imagen hero */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <span className="text-gray-500 font-serif text-2xl">
              Imagen de carne madurada aquí
            </span>
          </div>
        </div>

        <motion.div
          className="relative z-20 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Museo de la Carne
            <br />
            <span className="text-wine-600">Digital</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-2xl"
            variants={itemVariants}
          >
            Donde la tradición, la técnica y la pasión convergen en cada plato. Bienvenido a la filosofía de El Buey Madurado.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Blocks */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20 space-y-32">
        {storyBlocks.map((block, idx) => (
          <motion.div
            key={idx}
            className={`grid md:grid-cols-2 gap-12 items-center ${
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
              initial={{ opacity: 0, x: block.position === "left" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                {block.title}
              </h2>
              <div className="h-1 w-12 bg-wine-600 mb-6" />
              <p className="text-lg text-gray-600 leading-relaxed">
                {block.content}
              </p>
            </motion.div>

            {/* Placeholder para imagen */}
            <motion.div
              className={`relative h-96 rounded-xl overflow-hidden shadow-2xl ${
                block.position === "right" ? "md:order-1" : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-gray-600 font-serif text-xl text-center px-4">
                  Imagen de {block.title.toLowerCase()} aquí
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* Valores */}
      <section className="bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <div className="h-1 w-16 bg-wine-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                desc: "Solo los mejores productos, sin excepciones",
              },
              {
                title: "Sostenibilidad",
                icon: "♻",
                desc: "Compromiso con el medio ambiente y las comunidades locales",
              },
              {
                title: "Experiencia",
                icon: "♥",
                desc: "Cada detalle pensado para tu satisfacción",
              },
            ].map((valor, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-wine-600 transition text-center"
                variants={itemVariants}
              >
                <div className="text-4xl mb-4 text-wine-600">{valor.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {valor.title}
                </h3>
                <p className="text-gray-600">{valor.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl md:text-4xl font-serif text-gray-900 mb-4 italic">
            "Maduramos la carne, pero también el gusto por lo auténtico."
          </p>
          <p className="text-lg text-gray-600">
            En El Buey Madurado, cada hamburguesa es un acto de amor por la cocina bien hecha. Te invitamos a ser parte de esta experiencia.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
