import Image from 'next/image';
import Cows from '../public/cows.jpg';
import { SITE_TITLE, COLORS, FONT_FAMILY, IMAGE_PREVIEW } from '@/lib/constants';
import { FLOATING_EMOJI } from './emoji';


// force static
export const dynamic = 'force-static';


export default function Home() {
  return (
    <main
      className="flex h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.black }}
    >
      <div className="relative w-screen h-screen">
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
      </div>
    </main>
  );
}
