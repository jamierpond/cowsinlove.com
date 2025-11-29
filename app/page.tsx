'use client';

import Image from 'next/image';
import { useState } from 'react';
import Cows from '../public/cows.jpg';
import { SITE_TITLE, COLORS, FONT_FAMILY, IMAGE_PREVIEW } from '@/lib/constants';
import { FLOATING_EMOJI } from './emoji';

export default function Home() {
  const [explodingEmojis, setExplodingEmojis] = useState<
    { x: number; y: number; id: number; emoji: string; dx: number; dy: number; floatUp: number; rotation: number; duration: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const emojiChoices = ['🐄', '❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💘', '✨', '💫'];

    const newEmojis = Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 8 + Math.random() * 8;
      const floatUp = 10 + Math.random() * 8;
      const rotation = 360 + Math.random() * 720;
      const duration = 0.8 + Math.random() * 0.4;

      return {
        x,
        y,
        id: Date.now() + i,
        emoji: emojiChoices[Math.floor(Math.random() * emojiChoices.length)],
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        floatUp,
        rotation,
        duration,
      };
    });

    setExplodingEmojis(prev => [...prev, ...newEmojis]);

    setTimeout(() => {
      setExplodingEmojis(prev => prev.filter(e => !newEmojis.includes(e)));
    }, 1200);
  };

  return (
    <main
      className="container"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
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

        {explodingEmojis.map((emoji) => (
          <div
            key={emoji.id}
            className="exploding-emoji"
            style={{
              left: emoji.x,
              top: emoji.y,
              '--dx': `${emoji.dx}rem`,
              '--dy': `${emoji.dy}rem`,
              '--float-up': `${emoji.floatUp}rem`,
              '--rotation': `${emoji.rotation}deg`,
              '--duration': `${emoji.duration}s`,
            } as React.CSSProperties}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>
    </main>
  );
}
