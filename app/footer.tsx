import Link from 'next/link';

export default function Footer({ overlay = false }: { overlay?: boolean }) {
  return (
    <footer className={overlay ? 'site-footer site-footer-overlay' : 'site-footer'}>
      © 2026 Jamie Pond. All rights reserved.{' '}
      <Link href="/privacy">Privacy</Link> · <Link href="/support">Support</Link>
    </footer>
  );
}
