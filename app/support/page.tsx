import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '../info-page';

export const metadata: Metadata = {
  title: 'Support · Cows In Love',
  description:
    'How to play Cows In Love, and how to get in touch. Walk, moo, jump, find her.',
};

export default function Support() {
  return (
    <InfoPage title="Support">
      <p>
        Cows In Love is a little 3D game about a cow looking for the cow she loves.
        Wander the meadow, listen for her moo, and find her.
      </p>
      <p>It is on iOS, Android, macOS, Windows and Steam.</p>

      <h2>How to play</h2>
      <ul>
        <li>Walk with the on-screen stick, or WASD on a keyboard.</li>
        <li>Press Moo to hear where she is. She moos back.</li>
        <li>Jump over fences and logs.</li>
        <li>Cross the bridge.</li>
        <li>Find her. 💕</li>
      </ul>

      <h2>Accounts and purchases</h2>
      <p>
        There are none. No sign-in, no in-app purchases, no ads. Read the{' '}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Stuck, found a bug, or just want to say moo? Open an issue at{' '}
        <a href="https://github.com/jamierpond/cowsinlove.com/issues">
          github.com/jamierpond/cowsinlove.com/issues
        </a>
      </p>
    </InfoPage>
  );
}
