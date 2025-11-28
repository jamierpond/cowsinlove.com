import { ImageResponse } from 'next/og';
import { SITE_TITLE, COLORS, OG_IMAGE_SIZE } from '@/lib/constants';

export const alt = SITE_TITLE;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export default async function Image() {
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
        {/* Background decorative emojis */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            fontSize: '80px',
            opacity: 0.3,
          }}
        >
          🐄
        </div>
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            fontSize: '80px',
            opacity: 0.3,
          }}
        >
          🐄
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '15%',
            fontSize: '70px',
            opacity: 0.4,
          }}
        >
          ❤️
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            fontSize: '70px',
            opacity: 0.4,
          }}
        >
          💕
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '140px',
              fontWeight: 'bold',
              color: COLORS.hotPink,
              fontFamily: 'Comic Sans MS, Comic Sans, cursive',
              textShadow: `
                0 0 30px ${COLORS.white}cc,
                0 0 60px ${COLORS.hotPink}99,
                6px 6px 0px ${COLORS.white},
                -6px -6px 0px ${COLORS.white},
                6px -6px 0px ${COLORS.white},
                -6px 6px 0px ${COLORS.white}
              `,
            }}
          >
            {SITE_TITLE}
          </div>

          {/* Decorative hearts around title */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '30px',
              fontSize: '60px',
            }}
          >
            <span>🐄</span>
            <span>❤️</span>
            <span>🐄</span>
          </div>
        </div>

        {/* Pink glow overlay */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 50% 50%, ${COLORS.hotPink}26 0%, transparent 70%)`,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
