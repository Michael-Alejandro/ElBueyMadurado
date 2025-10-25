// ==========================
// 📌 SELECCIÓN DE ELEMENTOS
// ==========================

// Botón del menú móvil (☰)
const btn = document.getElementById('btnMobile');

// Menú desplegable móvil
const menu = document.getElementById('mobileMenu');

// Header principal (barra de navegación)
const header = document.getElementById('mainHeader');


// ==========================
// 📱 MENÚ MÓVIL
// ==========================

// Alterna visibilidad del menú en móviles al pulsar el botón ☰
btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});


// ==========================
// 🧭 NAVEGACIÓN SUAVE ENTRE SECCIONES
// ==========================

// Captura todos los enlaces internos (que empiezan con "#")
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault(); // Evita el salto brusco
    const target = document.querySelector(a.getAttribute('href')); // Obtiene la sección destino

    // Si existe la sección, hace scroll suave hacia ella
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Cierra el menú móvil si estaba abierto
    menu.classList.add('hidden');
  });
});


// ==========================
// 📆 ACTUALIZAR AÑO AUTOMÁTICAMENTE
// ==========================

// Muestra el año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();


// ==========================
// ✨ ANIMACIÓN DE ENTRADA (Fade-in)
// ==========================

// Usa IntersectionObserver para añadir la clase "visible" cuando el elemento entra en pantalla
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});

// Observa todos los elementos con la clase "fade-in"
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ==========================
// 🎨 EFECTO DE SCROLL EN EL HEADER
// ==========================

// Cambia el estilo del header cuando el usuario hace scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // 🔸 Scroll activo → fondo negro sólido, sin blur
    header.classList.remove('bg-white/5', 'backdrop-blur-md');
    header.classList.add('bg-black', 'backdrop-blur-0', 'shadow-lg');
  } else {
    // 🔹 En la parte superior → transparente con efecto glass
    header.classList.add('bg-white/5', 'backdrop-blur-md');
    header.classList.remove('bg-black', 'backdrop-blur-0', 'shadow-lg');
  }
});
