import type { Metadata } from 'next';
import SorteoExperience from '@/components/Sorteo/SorteoExperience';

export const metadata: Metadata = {
  title: 'Sorteo comida para 2 | El Buey Madurado',
  description:
    'Participa gratis en el sorteo de una comida o cena para 2 personas valorada en 150€ en El Buey Madurado.',
};

export default function SorteoPage() {
  return <SorteoExperience />;
}
