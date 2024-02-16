"use client"

import { Button } from "@/app/ui/button"
import { lusitana } from '@/app/ui/fonts';

export default function Home() {
  const showdatalink: string = "/records";
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <p
      className={`${lusitana.className} text-xl text-black md:text-3xl md:leading-normal`}
          >This is just to try out a special font</p>
      <Button className="mt-4 w-full" buttontext={'CallAPI'} showdatalink={showdatalink}></Button>
    </main>
  );
}
