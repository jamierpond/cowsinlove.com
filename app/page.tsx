"use client";
import { useState } from 'react';
import Image from 'next/image';
import Cows from '../public/cows.jpg';
import VideoFrame from '../public/frame.jpg';
import { SITE_TITLE, COLORS, FONT_FAMILY, IMAGE_PREVIEW } from '@/lib/constants';
import InteractiveContent from './interactive-content';

export default function Home() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <main>
      <div className="background">
        {/* Background elements first */}
        <Image
          src={VideoFrame}
          alt="Cows in love placeholder"
          fill
          priority
          placeholder="blur"
          className={`object-cover transition-opacity duration-1000 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          src="/out.webm"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover"
          onPlaying={() => setIsVideoReady(true)}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />

        {/* Foreground image */}
        <Image
          placeholder="blur"
          blurDataURL={IMAGE_PREVIEW}
          src={Cows}
          alt="Cows In Love"
          className="object-contain"
          fill
          priority
        />
        
        {/* Overlays and text, respecting CSS z-index */}
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
