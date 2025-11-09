# El Buey Madurado - React Website

Una página web moderna, elegante y completamente funcional para el restaurante **El Buey Madurado**, construida con **React 18**, **Vite**, **Tailwind CSS** y **Framer Motion**.

## 🌟 Características

### Tecnologías
- **React 18.2.0** - Librería UI moderna
- **React Router v6** - Navegación de múltiples páginas
- **Tailwind CSS 3.3** - Sistema de diseño utility-first
- **Framer Motion 10.16** - Animaciones suaves y profesionales
- **Vite 5.0** - Construcción ultrarrápida
- **PostCSS & Autoprefixer** - Procesamiento CSS optimizado

### Características de Diseño
✨ **Animaciones suaves** con Framer Motion en todas las transiciones
🎨 **Paleta de colores premium** - Wine red (#7B1113) y tonos grises elegantes
🔤 **Tipografía Georgia serif** - Transmite lujo y sofisticación
📱 **Completamente responsivo** - Mobile, tablet y desktop optimizados
🎯 **Interfaz limpia y moderna** - Espaciado elegante, bordes redondeados y sombras sutiles
⚡ **Rendimiento optimizado** - Carga rápida y animaciones fluidas

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx           # Barra de navegación con scroll detection
│   └── Footer.jsx           # Pie de página con copyright dinámico
├── pages/
│   ├── Home.jsx             # Página principal con hero y CTA
│   ├── Carta.jsx            # Menú con 3 categorías (Entrantes, Burgers, Postres)
│   ├── SobreNosotros.jsx   # "Museo de la Carne Digital" - Historia de la marca
│   └── Contacto.jsx         # Formulario, información de contacto y mapa
├── App.jsx                  # Configuración de React Router
├── main.jsx                 # Punto de entrada
└── index.css                # Estilos globales y componentes personalizados

img/                          # Carpeta de imágenes
├── logo.jpeg
├── hamburgesa-inicio.png
├── hamburgesa-1.jpeg
├── hamburgesa-2.jpeg
├── hamburgesa-3.png
├── patatas.jpeg
├── quesadilla.jpeg
├── tarta-twix.jpeg
├── tarta-pantera.jpeg
└── sobre-nosotros.jpeg
```

## 📄 Páginas Implementadas

### 🏠 Home (`/`)
- **Hero Section** - Imagen de fondo animada con gradiente oscuro
- **Sección "¿Quiénes Somos?"** - 3 tarjetas con valores (Carne Madurada, Ingredientes Frescos, Cocina Honesta)
- **Call-to-Action** - Sección con botón "Pedir Ahora" en fondo wine-600
- Todas las secciones con animaciones fade-in y scroll triggers

### 🍽️ Carta (`/carta`)
- **3 categorías de platos:**
  1. **Entrantes** - Patatas, Tabla de Quesos, Alitas BBQ, Quesadillas
  2. **Burgers** - La Madurada, Buey BBQ, Veggie Madurado, Premium Especial
  3. **Postres** - Tarta de Queso, Brownie, Tarta Pantera, Mousse
- **Tarjetas de platos** con:
  - Imagen del plato (cuando disponible)
  - Nombre y descripción
  - Precio
  - Botón "Pedir" funcional
- Efectos hover con zoom y sombras
- Animaciones staggered al cargar

### 🥩 Sobre Nosotros (`/sobre-nosotros`)
**"Museo de la Carne Digital"** - Sección destacada y visualmente rica:
- **Hero majestuoso** con imagen de fondo (sobre-nosotros.jpeg)
- **4 bloques de historia** alterni (texto-imagen):
  1. Nuestra Esencia
  2. Maduración Artesanal
  3. Ingredientes Locales
  4. Técnica y Pasión
- **Sección de Valores** con 3 pilares (Calidad Premium, Sostenibilidad, Experiencia)
- **Filosofía inspiradora** - Cita icónica con CTA
- Animaciones parallax y zoom on scroll

### 📞 Contacto (`/contacto`)
- **Formulario funcional** con validación:
  - Campos: Nombre, Email, Mensaje
  - Mensaje de éxito visual
  - Validación en cliente
- **Información de contacto:**
  - Teléfono
  - Email (con mailto link)
  - Dirección completa
- **Horario de atención** en tarjeta destacada
- **Mapa de Google Maps** embebido
- **Enlaces a redes sociales**

## 🎨 Sistema de Diseño

### Colores
```javascript
Wine Red:      #7B1113 (Acento primario)
Wine 700:      #6B0E10 (Hover states)
Wine 800:      #5B0B0D (States activos)
Gray 900:      #111827 (Fondos oscuros)
Gray 100-700:  Tonos neutrales
White:         #FFFFFF (Fondo principal)
```

### Tipografía
- **Encabezados:** Georgia serif, font-weight 700-900
- **Cuerpo:** Sistema fonts (sans-serif) con fallback a Georgia
- **Espaciado:** 8px base grid system

### Componentes Reutilizables
```css
.btn-primary      /* Botón wine-600 con hover */
.btn-secondary    /* Botón con borde wine-600 */
.section-title    /* Títulos grandes con serif */
.section-subtitle /* Subtítulos descriptivos */
```

## 🚀 Cómo Ejecutar

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Se abrirá en `http://localhost:3000`

### Producción
```bash
npm run build
```
Genera carpeta `dist/` lista para desplegar en Vercel

### Preview
```bash
npm run preview
```

## 📦 Dependencias

**Principales:**
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0
- framer-motion: ^10.16.4

**Dev:**
- vite: ^5.0.0
- @vitejs/plugin-react: ^4.2.1
- tailwindcss: ^3.3.0
- postcss: ^8.4.31
- autoprefixer: ^10.4.16

## 🎬 Animaciones

### Tipos de Animaciones Implementadas
1. **Fade-in on scroll** - Elementos aparecen suavemente al entrar en viewport
2. **Stagger children** - Elementos aparecen secuencialmente
3. **Scale & hover effects** - Zoom suave al pasar mouse
4. **Slide in** - Entradas laterales para secciones de historia
5. **Image zoom** - Imágenes hacen zoom en hover
6. **Gradient backgrounds** - Fondos animados sutiles

### Variantes Framer Motion
Todas las páginas utilizan variantes reutilizables:
```javascript
containerVariants    // Contenedor con stagger
itemVariants        // Items individuales
imageVariants       // Animaciones de imagen
```

## 📱 Responsividad

### Breakpoints
- **Mobile:** 320px - 768px (max-w-md)
- **Tablet:** 768px - 1024px (md: breakpoint)
- **Desktop:** 1024px+ (lg: breakpoint)

### Características Responsive
- Grillas que se adaptan (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Tipografía escalable (text-lg md:text-2xl lg:text-4xl)
- Padding/margin adaptativo (px-6 md:px-16)
- Menú móvil colapsable en Navbar

## 🌐 Despliegue en Vercel

1. **Conectar repositorio** a Vercel
2. **Configuración automática:**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Dominio personalizado:** ElBueyMadurado.com
4. **Deploy automático** en cada push

## 📝 Notas Técnicas

### Optimizaciones
- ✅ Imágenes optimizadas y comprimidas por Vite
- ✅ Código splitting automático
- ✅ Tree-shaking de dependencias no usadas
- ✅ CSS purificado por Tailwind
- ✅ Lazy loading en React Router

### Accesibilidad
- ✅ Semántica HTML correcta
- ✅ Alt text en imágenes
- ✅ Contraste de colores suficiente
- ✅ Labels en formularios
- ✅ Navegación con teclado funcional

### SEO
- ✅ Meta tags optimizados
- ✅ Títulos descriptivos
- ✅ Estructura semántica
- ✅ Mobile-friendly
- ✅ Rendimiento optimizado

## 🎯 Próximos Pasos

1. **Integración con Backend:**
   - Conectar formulario de contacto con email service
   - Sistema de órdenes online
   - Admin panel para gestionar menú

2. **Base de Datos (Supabase):**
   - Almacenar contactos
   - Gestionar platos y categorías
   - Sistema de usuarios

3. **Edge Functions:**
   - Envío de emails
   - Procesamiento de órdenes
   - Notificaciones

4. **Mejoras Futuras:**
   - Blog de recetas
   - Galería de fotos
   - Sistema de reservas
   - Integración con redes sociales

## 📧 Contacto

Desarrollado para **El Buey Madurado** - Alta cocina a domicilio.

---

**Última actualización:** Noviembre 2024
**Versión:** 1.0.0
**Estado:** Producción Lista ✅
