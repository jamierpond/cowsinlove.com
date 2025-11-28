"use client";
import Image from 'next/image'
import Cows from '../public/cows.webp'

export default function Home() {
  const floatingEmojis = [
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

        @keyframes throb {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: inset 0 0 200px 100px rgba(255, 105, 180, 0.4);
          }
          50% {
            box-shadow: inset 0 0 300px 150px rgba(255, 20, 147, 0.7);
          }
        }

        .floating-emoji {
          position: absolute;
          top: 0;
          animation: float linear infinite;
          pointer-events: none;
          z-index: 10;
          filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.8));
        }

        .vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          animation: pulse 2s ease-in-out infinite;
          background: radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(255, 105, 180, 0.3) 100%);
        }

        .pink-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          background: radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.15) 0%, transparent 70%);
          animation: throb 3s ease-in-out infinite;
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

        <div className="pink-overlay" />
        <div className="vignette" />

        {floatingEmojis.map((item, index) => (
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


