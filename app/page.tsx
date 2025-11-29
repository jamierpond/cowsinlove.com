"use server";
import Image from 'next/image';
import Cows from '../public/cows.jpg';
import { SITE_TITLE, COLORS, FONT_FAMILY, IMAGE_PREVIEW } from '@/lib/constants';
import InteractiveContent from './interactive-content';

export default async function Home() {
  return (
    <main>
      <div className="background">
        <Image
          src={IMAGE_PREVIEW}
          alt=""
          className="object-cover blur-background"
          fill
          unoptimized
        />
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
              0.125rem 0.125rem 0px ${COLORS.white},
              -0.125rem -0.125rem 0px ${COLORS.white},
              0.125rem -0.125rem 0px ${COLORS.white},
              -0.125rem 0.125rem 0px ${COLORS.white}
            `,
          }}
        >
          {SITE_TITLE.split('').map((char, index) => (
            <span
              key={index}
              className="wiggle-char"
              style={{
                '--delay': `${index * 0.15}s`,
              } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        <InteractiveContent />
      </div>
    </main>
  );
}
