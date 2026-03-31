'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { menuItems, type MenuItem } from '@/data/menu';
import './carta.css';

const slides: { key: MenuItem['categoria']; titulo: string }[] = [
  { key: 'Entrantes', titulo: 'Entrantes' },
  { key: 'Carnes', titulo: 'Carnes' },
  { key: 'Hamburguesas', titulo: 'Burgers' },
  { key: 'Postres', titulo: 'Postres' },
  { key: 'Bebidas', titulo: 'Bebidas' },
];

export default function CartaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [pendingSlide, setPendingSlide] = useState<number | null>(null);
  const [animationDirection, setAnimationDirection] = useState<string | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const cartaSectionRef = useRef<HTMLDivElement>(null);
  const cartaWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const ANIMATION_MS = 1000;

  const handleNavegaCategoria = (index: number) => {
    if (index === currentSlide || isAnimating) return;

    setPrevSlide(currentSlide);
    setPendingSlide(index);
    setAnimationDirection(index > currentSlide ? 'left' : 'right');
    setIsAnimating(true);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setCurrentSlide(index);
      setPendingSlide(null);
      setAnimationDirection(null);
      setIsAnimating(false);

      requestAnimationFrame(() => {
        scrollToTopSmooth();
      });
    }, ANIMATION_MS);
  };

  const topIndex = isAnimating ? prevSlide : currentSlide;
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

  const handleAbrirProducto = () => {};

  function scrollToTopSmooth() {
    const el = cartaSectionRef.current;
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  const renderBebidasLista = (items: MenuItem[]) => (
    <ul className="bebidas-list">
      {items.map((bebida) => (
        <li key={bebida.id} className="bebidas-item">
          <div className="bebidas-info">
            <span className="bebidas-name">{bebida.nombre}</span>

            {bebida.descripcion && (
              <span className="bebidas-desc">{bebida.descripcion}</span>
            )}
          </div>

          <span className="bebidas-price">{bebida.precio}</span>
        </li>
      ))}
    </ul>
  );

  const renderProductoCard = (
    producto: MenuItem,
    itemClassName?: string
  ) => {
    const esSuplemento = producto.tipo === 'Suplemento';
    const className = [
      'carta-product-item',
      'carta-product-item--noimage',
      itemClassName,
      esSuplemento
        ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-500 shadow-lg shadow-amber-300 ring-2 ring-amber-400'
        : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        key={producto.id}
        type="button"
        className={className}
        onClick={() => handleAbrirProducto()}
      >
        <div className="carta-product-info">
          <div className="carta-product-header">
            <h3
              className={`carta-product-name ${
                esSuplemento ? 'text-amber-900 font-bold text-lg' : ''
              }`}
            >
              {esSuplemento && '⭐ '}
              {producto.nombre}
            </h3>
          </div>

          <p
            className={`carta-product-description ${
              esSuplemento ? 'text-amber-800 italic' : ''
            }`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {producto.descripcion}
          </p>

          <div
            className={`carta-product-price-bottom ${
              esSuplemento ? 'text-amber-700 font-bold text-lg' : ''
            }`}
          >
            {producto.precio}
          </div>
        </div>
      </button>
    );
  };

  const renderProductosGrid = (
    items: MenuItem[],
    options?: {
      gridClassName?: string;
      itemClassName?: string;
    }
  ) => (
    <div
      className={['carta-products-grid', options?.gridClassName]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((producto) =>
        renderProductoCard(producto, options?.itemClassName)
      )}
    </div>
  );

  const renderCartaContent = (
    categoria: MenuItem['categoria'],
    titulo: string,
    productos: MenuItem[]
  ) => {
    const esBebidas = categoria === 'Bebidas';
    const esCarnes = categoria === 'Carnes';
    const bebidasPrincipales = ['Cervezas', 'Refrescos'] as const;
    const vinos = productos.filter((item) => item.subcategoria === 'Vinos');
    const vinosPorTipo = [
      { tipo: 'Copa', titulo: 'Por copa' },
      { tipo: 'Blanco', titulo: 'Blancos' },
      { tipo: 'Tinto', titulo: 'Tintos' },
    ] as const;
    const chuletones = productos.filter((item) =>
      item.nombre.startsWith('Chulet')
    );
    const carnesBase = productos.filter(
      (item) => !item.nombre.startsWith('Chulet')
    );

    return (
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

          {categoria === 'Postres' && (
            <div className="carta-letis-block">
              <img
                src="/assets/images/letis.webp"
                alt="Leti's Pastelería"
                className="carta-letis-logo"
                loading="lazy"
              />

              <div className="carta-letis-text">
                <span className="carta-letis-title">
                  Postres de autor by Leti's Atelier Gourmet
                </span>

                <p className="carta-letis-description">
                  Tartas de queso elaboradas artesanalmente en Xàtiva.
                </p>
              </div>
            </div>
          )}

          {categoria === 'Hamburguesas' && (
            <div className="carta-guarnicion">
              <div className="carta-guarnicion-title">Guarnición a elegir</div>

              <ul className="carta-guarnicion-list">
                <li className="carta-guarnicion-item">
                  <span className="carta-guarnicion-name">
                    Patatas fritas artesanas
                  </span>
                  <span className="carta-guarnicion-price">2,5€</span>
                </li>

                <li className="carta-guarnicion-item">
                  <span className="carta-guarnicion-name">
                    Patatas de boniato frito
                  </span>
                  <span className="carta-guarnicion-price">3€</span>
                </li>
              </ul>
            </div>
          )}

          {productos.length > 0 ? (
            esBebidas ? (
              <div className="bebidas-wrapper">
                <div className="bebidas-main">
                  {bebidasPrincipales.map((subcat) => {
                    const items = productos.filter(
                      (item) => item.subcategoria === subcat
                    );

                    if (items.length === 0) return null;

                    return (
                      <div key={subcat} className="bebidas-block">
                        <h3 className="bebidas-title">{subcat}</h3>
                        {renderBebidasLista(items)}
                      </div>
                    );
                  })}
                </div>

                {vinos.length > 0 && (
                  <div className="carta-vinos-section">
                    <div className="carta-vinos-block">
                      <div className="carta-vinos-text">
                        <span className="carta-vinos-title">
                          Selección de vinos
                        </span>

                        <p className="carta-vinos-description">
                          Una propuesta pensada para acompañar la maduración con
                          equilibrio y carácter.
                        </p>
                      </div>
                    </div>

                    <div className="bebidas-vinos-grid">
                      {vinosPorTipo.map(({ tipo, titulo }) => {
                        const items = vinos.filter((vino) => vino.tipo === tipo);

                        if (items.length === 0) return null;

                        return (
                          <div
                            key={tipo}
                            className="bebidas-block bebidas-block--vino"
                          >
                            <h3 className="bebidas-title bebidas-title--vino">
                              {titulo}
                            </h3>
                            {renderBebidasLista(items)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : esCarnes ? (
              <div className="carta-carnes-section">
                {carnesBase.length > 0 && renderProductosGrid(carnesBase)}

                {chuletones.length > 0 && (
                  <div className="carta-chuletones-section">
                    <div className="carta-chuletones-block">
                      <div className="carta-chuletones-text">
                        <span className="carta-chuletones-title">
                          Selección de chuletones
                        </span>

                        <p className="carta-chuletones-description">
                          Maduraciones largas y cortes nobles para una
                          experiencia más intensa.
                        </p>
                      </div>
                    </div>

                    {renderProductosGrid(chuletones, {
                      itemClassName: 'carta-product-item--premium',
                    })}
                  </div>
                )}
              </div>
            ) : (
              renderProductosGrid(productos)
            )
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
  };

  return (
    <>
      <nav className="carta-nav-categorias carta-nav-grid">
        {slides.map((slide, index) => {
          const isBebidas = slide.key === 'Bebidas';

          return (
            <button
              key={slide.key}
              onClick={() => handleNavegaCategoria(index)}
              className={`carta-nav-btn ${
                index === currentSlide ? 'carta-nav-btn-active' : ''
              } ${isBebidas ? 'carta-nav-btn-bebidas' : ''}`}
              disabled={isAnimating}
              aria-label={`Ver categoría ${slide.titulo}`}
            >
              {slide.titulo}
            </button>
          );
        })}
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
                  bottomCategoria,
                  bottomTitulo,
                  bottomProductos
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
                {renderCartaContent(topCategoria, topTitulo, topProductos)}
              </div>
            </div>
          </div>

          <div className="carta-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.key}
                onClick={() => {
                  if (!isAnimating) handleNavegaCategoria(index);
                }}
                className={`carta-indicator ${
                  index === currentSlide ? 'carta-indicator-active' : ''
                }`}
                disabled={isAnimating}
                aria-label={`Ir a ${slide.titulo}`}
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
                ×
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
                      <span className="carta-modal-label">Categoria</span>
                      <span className="carta-modal-badge">
                        {productoSeleccionado.categoria}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="carta-modal-subtitle">Descripcion</h3>
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
