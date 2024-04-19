"use client"

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import clsx from 'clsx';

export default function Home() {
  return (
    <main className="flex flex-col items-start">
      <div className={`${lusitana.className} text-2xl font-bold text-center w-full ml-[-80px] max-[767px]:hidden`}>Six Questions App</div>
      <div className={clsx(`flex flex-row md:flex-col basis-48 md:basis-12
                            shrink-0 space-x-2 py-2 md:space-x-0 md:space-y-4`)}>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden ">Six Records App Home Page (you're on it)</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Records answering each of the six questions</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Custom, re-useable answers to the question &apos;Who?&apos;</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Custom, re-useable answers to the question &apos;Where?&apos;</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Custom, re-useable answers to the question &apos;When?&apos;</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Create a record answering each of the six questions</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Create a custom, re-useable answer to the question &apos;Who?&apos;</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Create a custom, re-useable answer to the question &apos;Where?&apos;</p>
        <p className="basis-12 pl-2 md:text-base max-[767px]:hidden " >Create a custom, re-useable answer to the question &apos;When?&apos;</p>
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
