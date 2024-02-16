"use client"

import { Button } from "@/app/ui/button"
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Home() {
  const showdatalink: string = "/records";
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <p className={`${lusitana.className} text-xl text-black md:text-3xl md:leading-normal`}
          >This is just to try out a special font
      </p>
      <Image
          src="/artists-eye.png"
          width={100}
          height={100}
          className="block md:hidden"
          alt="Eye"
      />
      <Image
          src="/human-eye.png"
          width={500}
          height={500}
          className="hidden md:block"
          alt="Eye"
      />
      <Button className="mt-4 w-full" buttontext={'CallAPI'} showdatalink={showdatalink}></Button>
    </main>
  );
}
