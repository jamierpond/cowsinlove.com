import { ImageResponse } from 'next/og';
import { SITE_TITLE, COLORS, OG_IMAGE_SIZE } from '@/lib/constants';

export const runtime = 'edge';

export function getOgImage(origin: string = 'https://cowsinlove.com') {
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '140px',
              fontWeight: 'bold',
              color: COLORS.hotPink,
              fontFamily: 'Comic Neue, Comic Sans MS, cursive',
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
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    }
  );
}

export async function GET() {
  return getOgImage();
}
