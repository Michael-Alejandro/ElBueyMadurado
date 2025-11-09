import { useState } from "react";
import { motion } from "framer-motion";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setSubmitted(false), 4000);
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
    hidden: { opacity: 0, y: 30 },
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
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-32 px-6 md:px-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-wine-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-wine-700 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Contacto
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hablemos. Estamos aquí para ti, siempre.
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-28">
        <motion.div
          className="grid md:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Formulario */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Envíanos un mensaje
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-wine-600 to-wine-700 mb-8 rounded-full" />

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Nombre */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 transition bg-white placeholder-gray-400"
                  placeholder="Tu nombre"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 transition bg-white placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </motion.div>

              {/* Mensaje */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 transition bg-white placeholder-gray-400 resize-none"
                  placeholder="Tu mensaje..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-wine-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-wine-700 transition shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                Enviar Mensaje
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  className="p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  ✓ Gracias por tu mensaje. Nos pondremos en contacto pronto.
                </motion.div>
              )}
            </motion.form>
          </motion.div>

          {/* Información de Contacto */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Card Info */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                Información de Contacto
              </h3>

              <div className="space-y-6">
                {/* Teléfono */}
                <div className="pb-6 border-b border-gray-100">
                  <p className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-wide">
                    Teléfono
                  </p>
                  <a
                    href="tel:+34600000000"
                    className="text-2xl font-serif text-wine-600 hover:text-wine-700 font-bold transition"
                  >
                    +34 600 000 000
                  </a>
                </div>

                {/* Email */}
                <div className="pb-6 border-b border-gray-100">
                  <p className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-wide">
                    Email
                  </p>
                  <a
                    href="mailto:elbueymadurado@gmail.com"
                    className="text-lg font-serif text-wine-600 hover:text-wine-700 font-bold transition break-all"
                  >
                    elbueymadurado@gmail.com
                  </a>
                </div>

                {/* Dirección */}
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-wide">
                    Dirección
                  </p>
                  <p className="text-lg text-gray-800 font-medium">Av. de Selgas, 5</p>
                  <p className="text-lg text-gray-800 font-medium">46800 Xàtiva, Valencia</p>
                </div>
              </div>
            </motion.div>

            {/* Horario Card */}
            <motion.div
              className="bg-gradient-to-br from-wine-600 to-wine-700 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-serif font-bold mb-8">Horario de Atención</h3>

              <div className="space-y-4">
                {[
                  { day: "Lunes - Viernes", time: "12:00 - 23:00" },
                  { day: "Sábados", time: "13:00 - 00:00" },
                  { day: "Domingos", time: "13:00 - 22:00" },
                ].map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pb-4 border-b border-white/20 last:border-0"
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className="font-semibold text-lg">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-md"
              variants={itemVariants}
            >
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Síguenos</h3>
              <div className="flex gap-4">
                {[
                  { name: "Instagram", icon: "📷" },
                  { name: "Facebook", icon: "👍" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="w-14 h-14 bg-wine-600 text-white rounded-2xl flex items-center justify-center text-2xl hover:bg-wine-700 transition shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Ubicación
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-wine-600 to-wine-700 mb-12 rounded-full" />

          <motion.div
            className="w-full h-96 bg-gray-100 rounded-3xl border border-gray-200 overflow-hidden shadow-lg"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.136233277889!2d-0.524513524260092!3d38.99106167171492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61b0eaa6a4e7fb%3A0x62750eead409c4e0!2sAv.%20de%20Selgas%2C%205%2C%2046800%20X%C3%A0tiva%2C%20Valencia!5e0!3m2!1ses!2ses!4v1730028289000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
