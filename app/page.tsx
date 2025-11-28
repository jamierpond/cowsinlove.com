import Image from 'next/image'
import Cows from '../public/cows.webp'

export default function Home() {
  return (
    // Full height of the viewport and flex container to center content
    <main className="flex h-screen items-center justify-center bg-black">
      <div className="relative w-screen h-screen">
        <Image
          src={Cows}
          alt="Cows In Love"
          className="object-contain"
          fill
          priority
        />
      </div>
    </main>
  );
}


