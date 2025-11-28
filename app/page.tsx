"use client";
import Image from 'next/image'
import Cows from '../public/cows.webp'

export default function Home() {
  const floatingEmojis = [
    { emoji: '❤️', delay: 0, duration: 8, left: '10%' },
    { emoji: '🐄', delay: 1, duration: 10, left: '20%' },
    { emoji: '💕', delay: 2, duration: 7, left: '30%' },
    { emoji: '🐄', delay: 0.5, duration: 9, left: '40%' },
    { emoji: '💖', delay: 3, duration: 8, left: '50%' },
    { emoji: '🐄', delay: 1.5, duration: 11, left: '60%' },
    { emoji: '💗', delay: 2.5, duration: 9, left: '70%' },
    { emoji: '🐄', delay: 0.8, duration: 10, left: '80%' },
    { emoji: '💓', delay: 3.5, duration: 8, left: '15%' },
    { emoji: '🐄', delay: 2, duration: 9, left: '25%' },
    { emoji: '💝', delay: 1.2, duration: 10, left: '35%' },
    { emoji: '🐄', delay: 3, duration: 8, left: '45%' },
    { emoji: '💞', delay: 0.3, duration: 11, left: '55%' },
    { emoji: '🐄', delay: 2.8, duration: 9, left: '65%' },
    { emoji: '💘', delay: 1.8, duration: 10, left: '75%' },
    { emoji: '🐄', delay: 0.2, duration: 8, left: '85%' },
    { emoji: '❤️', delay: 2.2, duration: 9, left: '12%' },
    { emoji: '🐄', delay: 3.2, duration: 10, left: '22%' },
    { emoji: '💕', delay: 1.5, duration: 8, left: '32%' },
    { emoji: '🐄', delay: 0.7, duration: 11, left: '42%' },
  ];

  return (
    <main className="flex h-screen items-center justify-center bg-black overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .floating-emoji {
          position: absolute;
          top: 0;
          font-size: 3rem;
          animation: float linear infinite;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div className="relative w-screen h-screen">
        <Image
          src={Cows}
          alt="Cows In Love"
          className="object-contain"
          fill
          priority
        />

        {floatingEmojis.map((item, index) => (
          <div
            key={index}
            className="floating-emoji"
            style={{
              left: item.left,
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


