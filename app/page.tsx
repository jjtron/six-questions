"use client"

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <p className={`${lusitana.className} text-xl text-black md:text-3xl md:leading-normal`}
          >This is just to try out a special font
      </p>
      <Image
          src="/artists-eye.png"
          width={100}
          height={100}
          className="block md:hidden" // must be above screen width 640px, to "display: hidden" (otherwise, "display: block")
          alt="Eye"
      />
      <Image
          src="/human-eye.png"
          width={500}
          height={500}
          className="hidden md:block" // must be above screen width 640px, to "display: block" (otherwise, "display: hidden")
          alt="Eye"
      />
    </main>
  );
}
