"use client"

import { Button } from "@/app/ui/button"

export default function Home() {
  const showdatalink: string = "/records";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button className="mt-4 w-full" showdatalink={showdatalink}></Button>
    </main>
  );
}
