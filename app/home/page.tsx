"use client"

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import clsx from 'clsx';import {
  UserIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  CalendarIcon,
  PowerIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main>
      <div className="flex md:flex-col items-start max-[767px]:hidden">
      <div className={`${lusitana.className} text-2xl font-bold text-center w-full ml-[-80px]`}>Six Questions App</div>
      <div className={clsx(`flex flex-row md:flex-col basis-48 md:basis-12
                            shrink-0 space-x-2 py-2 md:space-x-0 md:space-y-4`)}>
        <p className="basis-12 pl-2 md:text-base">Six Records App Home Page (you're on it)</p>
        <p className="basis-12 pl-2 md:text-base" >Records answering each of the six questions</p>
        <p className="basis-12 pl-2 md:text-base" >Custom, re-useable answers to the question &apos;Who?&apos;</p>
        <p className="basis-12 pl-2 md:text-base" >Custom, re-useable answers to the question &apos;Where?&apos;</p>
        <p className="basis-12 pl-2 md:text-base" >Custom, re-useable answers to the question &apos;When?&apos;</p>
        <p className="basis-12 pl-2 md:text-base" >Create a record answering each of the six questions</p>
        <p className="basis-12 pl-2 md:text-base" >Create a custom, re-useable answer to the question &apos;Who?&apos;</p>
        <p className="basis-12 pl-2 md:text-base" >Create a custom, re-useable answer to the question &apos;Where?&apos;</p>
        <p className="basis-12 pl-2 md:text-base" >Create a custom, re-useable answer to the question &apos;When?&apos;</p>
      </div>
      </div>

      <div className={`${lusitana.className} text-xl font-bold text-center w-full min-[768px]:hidden`}>Six Questions App</div>
      <div className={clsx(`flex flex-col min-[768px]:hidden`)}>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <HomeIcon width={20} className="inline" />
          <span className="pl-2">Six Records App Home Page (you're on it)</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <DocumentDuplicateIcon width={20} className="inline"/>
          <span className="pl-2">Records answering each of the six questions</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <UsersIcon width={20} className="inline"/>
          <span className="pl-2">Custom, re-useable answers to the question &apos;Who?&apos;</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <BuildingOffice2Icon width={20} className="inline"/>
          <span className="pl-2">Custom, re-useable answers to the question &apos;Where?&apos;</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <CalendarIcon width={20} className="inline"/>
          <span className="pl-2">Custom, re-useable answers to the question &apos;When?&apos;</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <DocumentTextIcon width={20} className="inline"/>
          <span className="pl-2">Create a record answering each of the six questions</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <UserIcon width={20} className="inline"/>
          <span className="pl-2">Create a custom, re-useable answer to the question &apos;Who?&apos;</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <BuildingOfficeIcon width={20} className="inline"/>
          <span className="pl-2">Create a custom, re-useable answer to the question &apos;Where?&apos;</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-trl-1" >
          <CalendarIcon width={20} className="inline"/>
          <span className="pl-2">Create a custom, re-useable answer to the question &apos;When?&apos;</span>
        </p>
        <p className="basis-4 pl-2 md:text-xs flex flex-row border-1" >
          <PowerIcon width={20} className="inline"/>
          <span className="pl-2">Log out</span>
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
