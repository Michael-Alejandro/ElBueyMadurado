import type { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '@/lib/public-site-url';

// Páginas públicas que queremos que Google indexe.
// Al añadir o quitar una página de la web, actualiza esta lista.
const RUTAS_PUBLICAS = [
  '/',
  '/carta',
  '/reservas',
  '/contacto',
  '/sobre-nosotros',
  '/sorteo',
  '/aviso-legal',
  '/politica-de-privacidad',
  '/politica-de-cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS_PUBLICAS.map((ruta) => ({ url: getPublicSiteUrl(ruta) }));
}
