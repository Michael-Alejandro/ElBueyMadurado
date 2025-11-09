import { motion } from "framer-motion";
import hamburgesa1 from "../../img/hamburgesa-1.jpeg";
import hamburgesa2 from "../../img/hamburgesa-2.jpeg";
import hamburgesa3 from "../../img/hamburgesa-3.png";
import patatas from "../../img/patatas.jpeg";
import quesadilla from "../../img/quesadilla.jpeg";
import tartaTwix from "../../img/tarta-twix.jpeg";
import tartaPantera from "../../img/tarta-pantera.jpeg";

export default function Carta() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const dishes = {
    entrantes: [
      {
        name: "Patatas Deluxe Supreme",
        desc: "Papas crujientes con salsas artesanales y especias de la casa",
        price: "8,50 €",
        image: patatas,
      },
      {
        name: "Tabla de Quesos Madurados",
        desc: "Selección de quesos curados y embutidos ibéricos",
        price: "14,00 €",
        image: null,
      },
      {
        name: "Alitas de Pollo BBQ",
        desc: "Marinadas en salsa BBQ casera con toque ahumado",
        price: "9,50 €",
        image: null,
      },
      {
        name: "Quesadillas Mexicanas",
        desc: "Rellenas de queso fundido y jalapeños frescos",
        price: "6,50 €",
        image: quesadilla,
      },
    ],
    burgers: [
      {
        name: "La Madurada",
        desc: "Carne madurada, queso curado y cebolla caramelizada. El equilibrio perfecto.",
        price: "12,50 €",
        image: hamburgesa1,
      },
      {
        name: "Buey BBQ",
        desc: "Salsa BBQ casera, bacon crujiente, queso cheddar y carne madurada",
        price: "13,50 €",
        image: hamburgesa2,
      },
      {
        name: "Veggie Madurado",
        desc: "Hamburguesa vegetal gourmet, pan artesanal y aioli de ajo suave",
        price: "10,50 €",
        image: hamburgesa3,
      },
      {
        name: "Premium Especial",
        desc: "Doble carne, triple queso, setas salteadas y trufa negra",
        price: "18,00 €",
        image: null,
      },
    ],
    postres: [
      {
        name: "Tarta de Queso",
        desc: "Cremosa, artesanal con cobertura de frutos rojos frescos",
        price: "5,80 €",
        image: null,
      },
      {
        name: "Brownie de Chocolate",
        desc: "Intenso y jugoso con helado de vainilla premium",
        price: "6,50 €",
        image: null,
      },
      {
        name: "Tarta Pantera",
        desc: "Capas de chocolate y vainilla, decoración artesanal",
        price: "7,00 €",
        image: tartaPantera,
      },
      {
        name: "Mousse de Chocolate",
        desc: "Ligero, aireado y con sabor a chocolate belga puro",
        price: "5,00 €",
        image: tartaTwix,
      },
    ],
  };

  const renderDishSection = (title, items, icon) => (
    <motion.section
      key={title}
      className="mb-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{icon}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <div className="h-1 w-20 bg-gradient-to-r from-wine-600 to-wine-700 rounded-full" />
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((dish, idx) => (
          <motion.div
            key={idx}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-wine-600/30 shadow-md hover:shadow-2xl transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -8 }}
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              {dish.image ? (
                <motion.img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.15 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 font-serif">Imagen disponible</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-wine-600 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dish.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-2xl font-serif font-bold text-wine-600">
                  {dish.price}
                </span>
                <motion.button
                  className="px-6 py-2 bg-wine-600 text-white rounded-full hover:bg-wine-700 transition font-medium text-sm shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pedir
                </motion.button>
              </div>
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
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-32 px-6 md:px-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-wine-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-wine-700 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Nuestra Carta
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Alta cocina entre panes. Cada plato es una obra maestra.
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-28">
        {renderDishSection("Entrantes", dishes.entrantes, "🍽️")}
        {renderDishSection("Burgers", dishes.burgers, "🍔")}
        {renderDishSection("Postres", dishes.postres, "🍰")}

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center p-12 bg-gradient-to-r from-gray-50 to-white rounded-3xl border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            ¿Listo para probar?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Haz tu pedido online y disfruta de la experiencia del Buey Madurado
          </p>
          <motion.a
            href="#"
            className="inline-block bg-wine-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pedir Ahora
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
