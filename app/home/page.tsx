"use client"

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-start p-24">
      <div className={`${lusitana.className} text-3xl font-bold text-center w-full mb-4`}>Six Questions</div>
      <div className={`${lusitana.className} text-xl text-black md:text-xl md:leading-normal text-justify`} >
          <p className="mb-2">This app is inspired by the famous six questions that one should ask of one's self before writing about an event,
          of which I had learned long ago in grade school, and of which I had been instructed by the dear nuns in my Catholic grade-school,
          who thoroughly taught me the basics of reading, writing, and arithmetic.</p>
          <p>Anyone using this app is free to add content, as it is only for demonstration purposes, and it will probably not ever become
            widely popular, since the only people likely to discover it even exists are those invited to sample it as an example of my
            skill in creating a React app with full CRUD capability into a PostgreSQL database on it's backend.
          </p>
      </div>
      {/*
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
      */}
    </main>
  );
}
