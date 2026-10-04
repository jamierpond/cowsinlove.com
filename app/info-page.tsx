import Link from 'next/link';
import { COLORS, FONT_FAMILY } from '@/lib/constants';
import Footer from './footer';

export default function InfoPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="info-page" style={{ fontFamily: FONT_FAMILY }}>
      <main className="info-card">
        <Link href="/" className="info-home">
          🐄 cows in love ❤️
        </Link>
        <h1 style={{ color: COLORS.deepPink }}>{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}
