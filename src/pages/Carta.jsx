import { motion } from "framer-motion";

export default function Carta() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const dishes = {
    entrantes: [
      {
        name: "Patatas Deluxe Supreme",
        desc: "Papas crujientes con salsas artesanales y especias de la casa",
        price: "8,50 €",
      },
      {
        name: "Tabla de Quesos Madurados",
        desc: "Selección de quesos curados y embutidos ibéricos",
        price: "14,00 €",
      },
      {
        name: "Alitas de Pollo BBQ",
        desc: "Marinadas en salsa BBQ casera con toque ahumado",
        price: "9,50 €",
      },
      {
        name: "Quesadillas Mexicanas",
        desc: "Rellenas de queso fundido y jalapeños frescos",
        price: "6,50 €",
      },
    ],
    burgers: [
      {
        name: "La Madurada",
        desc: "Carne madurada, queso curado y cebolla caramelizada. El equilibrio perfecto.",
        price: "12,50 €",
      },
      {
        name: "Buey BBQ",
        desc: "Salsa BBQ casera, bacon crujiente, queso cheddar y carne madurada",
        price: "13,50 €",
      },
      {
        name: "Veggie Madurado",
        desc: "Hamburguesa vegetal gourmet, pan artesanal y aioli de ajo suave",
        price: "10,50 €",
      },
      {
        name: "Premium Especial",
        desc: "Doble carne, triple queso, setas salteadas y trufa negra",
        price: "18,00 €",
      },
    ],
    postres: [
      {
        name: "Tarta de Queso",
        desc: "Cremosa, artesanal con cobertura de frutos rojos frescos",
        price: "5,80 €",
      },
      {
        name: "Brownie de Chocolate",
        desc: "Intenso y jugoso con helado de vainilla premium",
        price: "6,50 €",
      },
      {
        name: "Tarta Pantera",
        desc: "Capas de chocolate y vainilla, decoración artesanal",
        price: "7,00 €",
      },
      {
        name: "Mousse de Chocolate",
        desc: "Ligero, aireado y con sabor a chocolate belga puro",
        price: "5,00 €",
      },
    ],
  };

  const renderDishSection = (title, items) => (
    <motion.section
      key={title}
      className="mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
        {title}
      </h2>
      <div className="h-1 w-20 bg-wine-600 mb-8" />

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((dish, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-wine-600 hover:shadow-lg transition group"
            variants={itemVariants}
          >
            {/* Placeholder para imagen */}
            <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition">
              <span className="text-gray-500 font-serif">Imagen aquí</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
              {dish.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{dish.desc}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-wine-600 font-bold text-lg">
                {dish.price}
              </span>
              <button className="px-4 py-2 bg-wine-600 text-white rounded-full hover:bg-wine-700 transition text-sm font-medium">
                Pedir
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.section
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-6 md:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Nuestra Carta
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Alta cocina entre panes. Cada plato es una obra maestra.
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        {renderDishSection("Entrantes", dishes.entrantes)}
        {renderDishSection("Burgers", dishes.burgers)}
        {renderDishSection("Postres", dishes.postres)}
      </section>
    </div>
  );
}
