import Link from 'next/link';
import './burger-offer.css';

export default function BurgerOffer() {
  return (
    <Link
      href="/carta#burgers"
      className="burger-offer bg-amber-500 text-[#1a1410]"
    >
      <span className="burger-offer-text">
        <strong>5 € de descuento</strong> en todas las burgers{' '}
        <span aria-hidden="true">→</span>
      </span>
      <span className="burger-offer-text-short">
        <strong>−5 €</strong> en todas las burgers{' '}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
