'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { menuItems } from '@/data/menu';
import './carta.css';

const slides = [
  { key: 'Entrantes', titulo: 'Entrantes' },
  { key: 'Carnes', titulo: 'Carnes' },
  { key: 'Hamburguesas', titulo: 'Burgers' },
  { key: 'Postres', titulo: 'Postres' },
];

export default function CartaPage() {
  // Slide "estable" (el que de verdad está activo cuando no hay animación)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide que se va (contenido de la página superior durante la animación)
  const [prevSlide, setPrevSlide] = useState(0);

  // Slide al que vamos (contenido preparado en la página inferior durante la animación)
  const [pendingSlide, setPendingSlide] = useState<number | null>(null);

  const [animationDirection, setAnimationDirection] = useState<string | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const cartaSectionRef = useRef<HTMLDivElement>(null);
  const cartaWrapperRef = useRef<HTMLDivElement>(null);

  // Timeout cleanup
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const ANIMATION_MS = 1000; // ajusta si tu CSS tiene otra duración

  const handleNavegaCategoria = (index: number) => {
    // Si ya estamos en ese slide o animando, no hacemos nada
    if (index === currentSlide || isAnimating) return;

    // 1) La página superior debe seguir mostrando el slide ACTUAL (antes de cambiar)
    setPrevSlide(currentSlide);

    // 2) Preparamos en la página inferior el slide DESTINO (pero NO lo activamos aún)
    setPendingSlide(index);

    // 3) Arrancamos animación
    setAnimationDirection(index > currentSlide ? 'left' : 'right');
    setIsAnimating(true);

    // 4) Al terminar, ya activamos el slide destino
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      // Aplicamos el cambio real
      setCurrentSlide(index);
      setPendingSlide(null);

      // Reseteamos animación
      setAnimationDirection(null);
      setIsAnimating(false);

      // ✅ Y AHORA subimos suave (después del cambio)
      requestAnimationFrame(() => {
        scrollToTopSmooth();
      });
    }, ANIMATION_MS);
  };


  // ✅ TOP (la página que se anima y se va): durante animación = prevSlide, si no = currentSlide
  const topIndex = isAnimating ? prevSlide : currentSlide;

  // ✅ BOTTOM (la página de abajo): durante animación = pendingSlide, si no = currentSlide
  const bottomIndex = pendingSlide ?? currentSlide;

  const topCategoria = slides[topIndex].key;
  const topTitulo = slides[topIndex].titulo;

  const bottomCategoria = slides[bottomIndex].key;
  const bottomTitulo = slides[bottomIndex].titulo;

  const topProductos = useMemo(
    () => menuItems.filter((item) => item.categoria === topCategoria),
    [topCategoria]
  );

  const bottomProductos = useMemo(
    () => menuItems.filter((item) => item.categoria === bottomCategoria),
    [bottomCategoria]
  );

  const handleAbrirProducto = () => {

  };

  function scrollToTopSmooth() {
    const el = cartaSectionRef.current;
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  const renderCartaContent = (
    _categoria: string,
    titulo: string,
    productos: any[]
  ) => (
    <div>
      <div className="carta-corner carta-corner-top-left"></div>
      <div className="carta-corner carta-corner-top-right"></div>
      <div className="carta-corner carta-corner-bottom-left"></div>
      <div className="carta-corner carta-corner-bottom-right"></div>

      <div className="carta-content">
        <div className="carta-category-header">
          <div className="carta-decorative-line"></div>
          <h2 className="carta-category-title">{titulo}</h2>
          <div className="carta-decorative-line"></div>
        </div>

        {productos.length > 0 ? (
          <div className="carta-products-grid">
            {productos.map((producto: any) => (
              <button
                key={producto.id}
                type="button"
                className="carta-product-item carta-product-item--noimage"
                onClick={() => handleAbrirProducto()}
              >
                <div className="carta-product-info">
                  <div className="carta-product-header">
                    <h3 className="carta-product-name">{producto.nombre}</h3>
                  </div>

                  <p className="carta-product-description">
                    {producto.descripcion}
                  </p>

                  <div className="carta-product-price-bottom">
                    €{Number(producto.precio).toFixed(2)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="carta-empty">
            <p>No hay productos en esta categoría</p>
          </div>
        )}

        <div className="carta-footer">
          <p className="carta-footer-text">Restaurante el Buey Madurado</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* NAVBAR FIJA CON BOTONES DE CATEGORÍAS */}
      <nav className="carta-nav-categorias">
        {slides.map((slide, index) => (
          <button
            key={slide.key}
            onClick={() => handleNavegaCategoria(index)}
            className={`carta-nav-btn ${
              index === currentSlide ? 'carta-nav-btn-active' : ''
            }`}
            aria-label={`Ver categoría ${slide.titulo}`}
            disabled={isAnimating}
          >
            {slide.titulo}
          </button>
        ))}
      </nav>

      <section className="carta-section" ref={cartaSectionRef}>
        <div className="carta-container">
          <div className="carta-header">
            <p className="carta-subtitle">
              Descubre nuestras especialidades elaboradas con carne madurada y
              productos de proximidad.
            </p>
          </div>

          <div className="carta-wrapper" ref={cartaWrapperRef}>
            <div className="carta-page-wrapper">
              {/* Página inferior: durante animación ya tiene el contenido destino */}
              <div className="carta-page carta-page-bottom">
                {renderCartaContent(bottomCategoria, bottomTitulo, bottomProductos)}
              </div>

              {/* Página superior: durante animación mantiene contenido anterior y se desplaza */}
              <div
                className={`carta-page carta-page-top ${
                  isAnimating && animationDirection === 'left'
                    ? 'carta-page-out-left'
                    : isAnimating && animationDirection === 'right'
                    ? 'carta-page-out-right'
                    : ''
                }`}
              >
                {renderCartaContent(topCategoria, topTitulo, topProductos)}
              </div>
            </div>
          </div>

          <div className="carta-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) handleNavegaCategoria(index);
                }}
                className={`carta-indicator ${
                  index === currentSlide ? 'carta-indicator-active' : ''
                }`}
                disabled={isAnimating}
                aria-label={`Ir a ${slides[index].titulo}`}
              />
            ))}
          </div>
        </div>

        {/* MODAL
        {productoSeleccionado && (
          <div className="carta-modal-overlay" onClick={handleCerrarProducto}>
            <div className="carta-modal" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleCerrarProducto}
                className="carta-modal-close"
                aria-label="Cerrar"
              >
                ✕
              </button>

              <div className="carta-modal-content carta-modal-content--noimage">
                <div className="carta-modal-info">
                  <div>
                    <h2 className="carta-modal-title">
                      {productoSeleccionado.nombre}
                    </h2>
                    <div className="carta-modal-divider"></div>
                  </div>

                  <div>
                    <div className="carta-modal-price-group">
                      <span className="carta-modal-label">Precio</span>
                      <span className="carta-modal-price">
                        €{Number(productoSeleccionado.precio).toFixed(2)}
                      </span>
                    </div>

                    <div className="carta-modal-category-group">
                      <span className="carta-modal-label">Categoría</span>
                      <span className="carta-modal-badge">
                        {productoSeleccionado.categoria}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="carta-modal-subtitle">Descripción</h3>
                    <p className="carta-modal-description">
                      {productoSeleccionado.descripcion}
                    </p>
                  </div>

                  <button
                    onClick={handleCerrarProducto}
                    className="carta-modal-button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </section>
    </>
  );
}
