// app/page.tsx

import Image from 'next/image';
import Cows from '../public/cows.jpg';
import { SITE_TITLE, COLORS, FONT_FAMILY } from '@/lib/constants';

const IMAGE_PREVIEW =
  "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUAA8DASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMFBP/EAB8QAAICAQQDAAAAAAAAAAAAAAECAAMEBREhIjFBQv/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQMhYf/aAAwDAQACEQMRAD8AmC8vlMu/mKyiyP2G0w4mbSA19tncfI9xOdqT3FdzCKIx33hLjV5HMIRTBn//2Q==";

// force static
export const dynamic = 'force-static';

const FLOATING_EMOJI = [
  { emoji: '❤️', delay: 0, duration: 8, left: '10%', size: '3rem' },
  { emoji: '🐄', delay: 1, duration: 10, left: '20%', size: '3.5rem' },
  { emoji: '💕', delay: 2, duration: 7, left: '30%', size: '2.5rem' },
  { emoji: '🐄', delay: 0.5, duration: 9, left: '40%', size: '4rem' },
  { emoji: '💖', delay: 3, duration: 8, left: '50%', size: '3rem' },
  { emoji: '🐄', delay: 1.5, duration: 11, left: '60%', size: '3.5rem' },
  { emoji: '💗', delay: 2.5, duration: 9, left: '70%', size: '2.8rem' },
  { emoji: '🐄', delay: 0.8, duration: 10, left: '80%', size: '3.2rem' },
  { emoji: '💓', delay: 3.5, duration: 8, left: '15%', size: '3.5rem' },
  { emoji: '🐄', delay: 2, duration: 9, left: '25%', size: '4.2rem' },
  { emoji: '💝', delay: 1.2, duration: 10, left: '35%', size: '2.5rem' },
  { emoji: '🐄', delay: 3, duration: 8, left: '45%', size: '3.8rem' },
  { emoji: '💞', delay: 0.3, duration: 11, left: '55%', size: '3rem' },
  { emoji: '🐄', delay: 2.8, duration: 9, left: '65%', size: '3.3rem' },
  { emoji: '💘', delay: 1.8, duration: 10, left: '75%', size: '2.7rem' },
  { emoji: '🐄', delay: 0.2, duration: 8, left: '85%', size: '3.6rem' },
  { emoji: '❤️', delay: 2.2, duration: 9, left: '12%', size: '3.2rem' },
  { emoji: '🐄', delay: 3.2, duration: 10, left: '22%', size: '3.4rem' },
  { emoji: '💕', delay: 1.5, duration: 8, left: '32%', size: '2.9rem' },
  { emoji: '🐄', delay: 0.7, duration: 11, left: '42%', size: '4.5rem' },
  { emoji: '✨', delay: 0.4, duration: 6, left: '5%', size: '2.5rem' },
  { emoji: '✨', delay: 1.8, duration: 7, left: '18%', size: '2rem' },
  { emoji: '💫', delay: 2.4, duration: 6.5, left: '28%', size: '2.3rem' },
  { emoji: '✨', delay: 0.9, duration: 7, left: '38%', size: '2.2rem' },
  { emoji: '💫', delay: 3.1, duration: 6, left: '48%', size: '2.4rem' },
  { emoji: '✨', delay: 1.3, duration: 6.8, left: '58%', size: '2.1rem' },
  { emoji: '💫', delay: 2.7, duration: 6.2, left: '68%', size: '2.5rem' },
  { emoji: '✨', delay: 0.6, duration: 7, left: '78%', size: '2rem' },
  { emoji: '💫', delay: 3.4, duration: 6.5, left: '88%', size: '2.3rem' },
  { emoji: '✨', delay: 1.9, duration: 6, left: '93%', size: '2.2rem' },
] as const;

export default function Home() {
  return (
    <main
      className="flex h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.black }}
    >
      <div className="relative w-screen h-screen">
        <Image
          placeholder="blur"
          blurDataURL={IMAGE_PREVIEW}
          src={Cows}
          alt="Cows In Love"
          className="object-contain"
          fill
          priority
        />

        <div className="pink-overlay" />
        <div className="vignette" />

        <div
          className="title"
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 'clamp(2rem, 10vw, 8rem)',
            color: COLORS.hotPink,
            textShadow: `
              0 0 20px ${COLORS.white}cc,
              0 0 40px ${COLORS.hotPink}99,
              4px 4px 0px ${COLORS.white},
              -4px -4px 0px ${COLORS.white},
              4px -4px 0px ${COLORS.white},
              -4px 4px 0px ${COLORS.white}
            `,
          }}
        >
          {SITE_TITLE}
        </div>

        {FLOATING_EMOJI.map((item, index) => (
          <div
            key={index}
            className="floating-emoji"
            style={{
              left: item.left,
              fontSize: item.size,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              transform: 'translateY(100vh)',
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
    </main>
  );
}
