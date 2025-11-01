import { useState } from "react";
import { motion } from "framer-motion";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setFormData({ nombre: "", email: "", mensaje: "" });
    alert("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
            Contacto
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hablemos. Estamos aquí para ti.
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Formulario */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Envíanos un mensaje
            </h2>
            <div className="h-1 w-12 bg-wine-600 mb-8" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wine-600 focus:ring-1 focus:ring-wine-600 transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wine-600 focus:ring-1 focus:ring-wine-600 transition"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wine-600 focus:ring-1 focus:ring-wine-600 transition resize-none"
                  placeholder="Tu mensaje..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary justify-center font-semibold"
              >
                Enviar
              </button>
            </form>
          </motion.div>

          {/* Información de Contacto */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Información de Contacto
              </h3>

              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Teléfono
                  </p>
                  <a
                    href="tel:+34600000000"
                    className="text-lg text-wine-600 hover:text-wine-700 font-medium"
                  >
                    +34 600 000 000
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:elbueymadurado@gmail.com"
                    className="text-lg text-wine-600 hover:text-wine-700 font-medium"
                  >
                    elbueymadurado@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Dirección
                  </p>
                  <p className="text-lg">Av. de Selgas, 5</p>
                  <p className="text-lg">46800 Xàtiva, Valencia</p>
                </div>
              </div>
            </motion.div>

            {/* Horario */}
            <motion.div
              className="bg-wine-600 text-white p-8 rounded-xl"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-serif font-bold mb-4">Horario</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="font-semibold">12:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-semibold">13:00 - 00:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span className="font-semibold">13:00 - 22:00</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Ubicación
          </h2>
          <div className="h-1 w-12 bg-wine-600 mb-8" />

          <div className="w-full h-96 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.136233277889!2d-0.524513524260092!3d38.99106167171492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61b0eaa6a4e7fb%3A0x62750eead409c4e0!2sAv.%20de%20Selgas%2C%205%2C%2046800%20X%C3%A0tiva%2C%20Valencia!5e0!3m2!1ses!2ses!4v1730028289000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
