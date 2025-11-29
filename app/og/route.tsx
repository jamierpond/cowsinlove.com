import { ImageResponse } from 'next/og';
import { SITE_TITLE, COLORS, OG_IMAGE_SIZE } from '@/lib/constants';
import fs from 'fs/promises';
import path from 'path';

export async function getOgImage(origin: string = 'https://cowsinlove.com') {
  const fontData = await fs.readFile(
    path.join(process.cwd(), 'public', 'ComicNeue-Bold.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.black,
          position: 'relative',
        }}
      >
        {/* Background image */}
        <img
          src={`${origin}/cows.jpg`}
          width={OG_IMAGE_SIZE.width}
          height={OG_IMAGE_SIZE.height}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        {/* Pink overlay */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 50% 50%, ${COLORS.hotPink}26 0%, transparent 70%)`,
          }}
        />

        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
          }}
        />

        {/* Floating emojis - scattered around */}
        <div style={{ position: 'absolute', top: '8%', left: '12%', fontSize: '60px', opacity: 0.6 }}>❤️</div>
        <div style={{ position: 'absolute', top: '15%', left: '25%', fontSize: '70px', opacity: 0.5 }}>🐄</div>
        <div style={{ position: 'absolute', top: '22%', left: '75%', fontSize: '55px', opacity: 0.6 }}>💕</div>
        <div style={{ position: 'absolute', top: '65%', left: '15%', fontSize: '65px', opacity: 0.5 }}>🐄</div>
        <div style={{ position: 'absolute', top: '70%', left: '82%', fontSize: '60px', opacity: 0.6 }}>💖</div>
        <div style={{ position: 'absolute', top: '85%', left: '68%', fontSize: '70px', opacity: 0.5 }}>🐄</div>
        <div style={{ position: 'absolute', top: '12%', left: '88%', fontSize: '50px', opacity: 0.7 }}>✨</div>
        <div style={{ position: 'absolute', top: '78%', left: '35%', fontSize: '55px', opacity: 0.6 }}>💓</div>
        <div style={{ position: 'absolute', top: '45%', left: '8%', fontSize: '48px', opacity: 0.7 }}>💫</div>
        <div style={{ position: 'absolute', top: '40%', left: '90%', fontSize: '52px', opacity: 0.7 }}>✨</div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          {SITE_TITLE.split('').map((char, index) => {
            const wave = Math.sin(index * 0.5) * 15;
            return (
              <div
                key={index}
                style={{
                  fontSize: '140px',
                  fontWeight: 'bold',
                  color: COLORS.hotPink,
                  fontFamily: '"Comic Neue"',
                  textShadow: `
                    0 0 40px ${COLORS.white}ff,
                    0 0 80px ${COLORS.hotPink}ff,
                    0 0 120px ${COLORS.hotPink}cc,
                    4px 4px 0px ${COLORS.white},
                    -4px -4px 0px ${COLORS.white},
                    4px -4px 0px ${COLORS.white},
                    -4px 4px 0px ${COLORS.white},
                    8px 8px 0px ${COLORS.white}aa
                  `,
                  transform: `translateY(${wave}px) rotate(${wave * 0.3}deg)`,
                  display: 'flex',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </div>
            );
          })}
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        {
          name: 'Comic Neue',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}

export async function GET() {
  return getOgImage();
}
