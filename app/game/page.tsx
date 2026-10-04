import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { COLORS, FONT_FAMILY } from '@/lib/constants';
import Footer from '../footer';

const shortDescription =
  'A cow is looking for her love in a misty meadow. Moo, listen for her answer, hop the fences, time the bridge, and find her.';

export const metadata: Metadata = {
  metadataBase: new URL('https://cowsinlove.com'),
  title: 'Cows In Love, the game',
  description: shortDescription,
  openGraph: {
    title: 'Cows In Love, the game',
    description: shortDescription,
    images: [{ url: '/game/header-capsule.jpg', width: 920, height: 430 }],
  },
};

// To put a store live, set its href (the Apple and Microsoft ones are ready
// in the comments): a store with an href renders as a link, one without as
// "Coming soon".
const stores: { name: string; href: string | null }[] = [
  { name: 'App Store', href: null }, // 'https://apps.apple.com/app/id6818912150'
  { name: 'Mac App Store', href: null }, // 'https://apps.apple.com/app/id6818912150'
  { name: 'Microsoft Store', href: null }, // 'https://apps.microsoft.com/detail/9MZG57XW2517'
  { name: 'Google Play', href: null },
  { name: 'Steam', href: null },
];

const shots = [
  {
    src: '/game/1-meadow.jpg',
    caption: 'The meadow',
    alt: 'A cow standing in a misty green meadow, with trees, hedges and barns in the fog.',
  },
  {
    src: '/game/2-moo.jpg',
    caption: 'Moo, and she moos back',
    alt: 'The cow in the meadow under a cartoon sun; a pink glow in the fog shows where the answering moo came from.',
  },
  {
    src: '/game/3-ravine.jpg',
    caption: 'The ravine',
    alt: 'The meadow ends at a deep ravine.',
  },
  {
    src: '/game/4-bridge.jpg',
    caption: 'Time the bridge',
    alt: 'A narrow plank bridge across the ravine, with hay bales rolling over it.',
  },
  {
    src: '/game/5-jump.jpg',
    caption: 'Jump the logs and fences',
    alt: 'The cow mid-jump over a row of logs, with a fence beyond.',
  },
  {
    src: '/game/6-found.jpg',
    caption: 'Found her',
    alt: 'Two cows nose to nose with heart eyes, under the title cowsinlove.com.',
  },
];

const howToPlay = [
  { emoji: '🕹️', text: 'Walk with the stick, or WASD' },
  { emoji: '📣', text: 'Moo to hear where she is' },
  { emoji: '🪵', text: 'Jump fences and logs' },
  { emoji: '🌉', text: 'Cross the bridge' },
];

export default function Game() {
  return (
    <div className="info-page" style={{ fontFamily: FONT_FAMILY }}>
      <main className="info-card game-card">
        <Link href="/" className="info-home">
          🐄 cows in love ❤️
        </Link>

        <section className="game-hero">
          <Image
            src="/game/header-capsule.jpg"
            alt="Cows In Love"
            width={920}
            height={430}
            priority
            className="game-capsule"
          />
          <h1 style={{ color: COLORS.deepPink }}>Cows In Love</h1>
          <p className="game-tagline">{shortDescription}</p>
          <div className="game-stores">
            {stores.map((store) =>
              store.href ? (
                <a key={store.name} href={store.href} className="game-store">
                  <span className="game-store-name">{store.name}</span>
                  <span className="game-store-note">Get it</span>
                </a>
              ) : (
                <span
                  key={store.name}
                  className="game-store game-store-soon"
                  aria-disabled="true"
                >
                  <span className="game-store-name">{store.name}</span>
                  <span className="game-store-note">Coming soon</span>
                </span>
              ),
            )}
          </div>
        </section>

        <h2>About this game</h2>
        <p>Somewhere in a foggy meadow, the other cow is waiting.</p>
        <p>
          Cows In Love is a small, gentle 3D game about finding someone. Walk your
          cow through hedgerows, groves, hay bales and barns. You can&apos;t see
          far, so moo: she moos back, and you can hear whether she is close by or
          far off, and which way. The nearer you get, the faster both your hearts
          beat.
        </p>
        <p>
          Then the meadow gives way. Hop logs and fences, cross a ravine on a
          narrow plank bridge while bales of hay roll across it, and find her on
          the other side.
        </p>
        <p>
          When you do, the two of you meet nose to nose, the hearts come out, and
          the next meadow begins.
        </p>
        <ul>
          <li>A fresh meadow every round</li>
          <li>Moo for a hint: she answers from where she is, in stereo</li>
          <li>Jump fences, logs and barn roofs</li>
          <li>A ravine crossing that is all about timing</li>
          <li>Walk with WASD, HJKL or the arrow keys; space to jump; M to moo</li>
        </ul>

        <h2>Screenshots</h2>
        <div className="game-gallery">
          {shots.map((shot) => (
            <figure key={shot.src}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1280}
                height={720}
                sizes="(max-width: 640px) 100vw, 30rem"
              />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <h2>How to play</h2>
        <ol className="game-howto">
          {howToPlay.map((step) => (
            <li key={step.text}>
              <span className="game-howto-emoji">{step.emoji}</span>
              {step.text}
            </li>
          ))}
        </ol>

        <p className="game-promise">No ads, no accounts, no data collected. 💕</p>
      </main>
      <Footer />
    </div>
  );
}
