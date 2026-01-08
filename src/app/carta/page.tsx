'use client';

import { useState, useMemo, useRef } from 'react';
import { menuItems } from '@/data/menu';
import './carta.css';

const slides = [
  { key: 'Entrantes', titulo: 'Entrantes' },
  { key: 'Carnes', titulo: 'Carnes' },
  { key: 'Hamburguesas', titulo: 'Hamburguesas' },
  { key: 'Postres', titulo: 'Postres' },
];

export default function CartaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
  const [animationDirection, setAnimationDirection] = useState<string | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const cartaSectionRef = useRef<HTMLDivElement>(null);
  const cartaWrapperRef = useRef<HTMLDivElement>(null);

  const handleNavegaCategoria = (index: number) => {
    if (index === currentSlide || isAnimating) return;

    setAnimationDirection(index > currentSlide ? 'left' : 'right');
    setIsAnimating(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setAnimationDirection(null);
      setIsAnimating(false);
    }, 1000);
  };

  const activeCategoria = slides[currentSlide].key;
  const activoTitulo = slides[currentSlide].titulo;

  let nextSlideIndex;
  if (animationDirection === 'left') {
    nextSlideIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
  } else if (animationDirection === 'right') {
    nextSlideIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  } else {
    nextSlideIndex =
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
  }

  const nextCategoria = slides[nextSlideIndex].key;
  const nextTitulo = slides[nextSlideIndex].titulo;

  const productosFiltrados = useMemo(
    () => menuItems.filter((item) => item.categoria === activeCategoria),
    [activeCategoria]
  );

  const nextProductosFiltrados = useMemo(
    () => menuItems.filter((item) => item.categoria === nextCategoria),
    [nextCategoria]
  );

  const handleAbrirProducto = (producto: any) => {
    setProductoSeleccionado(producto);
    document.documentElement.classList.add('modal-open');
  };

  const handleCerrarProducto = () => {
    setProductoSeleccionado(null);
    document.documentElement.classList.remove('modal-open');
  };

  const renderCartaContent = (
    _categoria: string,
    titulo: string,
    productos: any
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
                onClick={() => handleAbrirProducto(producto)}
              >
                <div className="carta-product-info">
                  <div className="carta-product-header">
                    <h3 className="carta-product-name">{producto.nombre}</h3>
                  </div>

                  <p className="carta-product-description">
                    {producto.descripcion}
                  </p>

                  {/* Precio abajo a la derecha */}
                  <div className="carta-product-price-bottom">
                    €{producto.precio.toFixed(2)}
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
          <p className="carta-footer-text">
            Restaurante el Buey Madurado
          </p>
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
              <div className="carta-page carta-page-bottom">
                {renderCartaContent(
                  nextCategoria,
                  nextTitulo,
                  nextProductosFiltrados
                )}
              </div>

              <div
                className={`carta-page carta-page-top ${
                  isAnimating && animationDirection === 'left'
                    ? 'carta-page-out-left'
                    : isAnimating && animationDirection === 'right'
                    ? 'carta-page-out-right'
                    : ''
                }`}
              >
                {renderCartaContent(
                  activeCategoria,
                  activoTitulo,
                  productosFiltrados
                )}
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
                        €{productoSeleccionado.precio.toFixed(2)}
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
