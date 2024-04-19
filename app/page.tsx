import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import "@/app/globals.css";

export default function Page() {

  // ALL THE FOLLOWING WAS HERE FOR LOGIN WHICH I CNNOT GET TO WORK ON DIGITAL OCEAN
  return (
    <main>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal text-center w-full`}>
            <strong>Welcome to the </strong>
          </p>
          <div className={`${lusitana.className} md:text-3xl text-xl font-bold text-center w-full mb-4`}>Six Questions App</div>
          <div className={`${lusitana.className} text-xl text-black md:text-xl md:leading-normal md:px-28 px-6 text-justify`} >
              <p className="mb-2">This app is inspired by the famous six questions that one should ask of one&apos;s self before writing about an event.</p>
              <p className="mb-6">Anyone using this app is free to add content, as it is only for demonstration purposes, and it will probably not ever become
                widely popular, since the only people likely to discover it even exists are those invited to sample it as an example of my
                skill in creating a React app with full CRUD capability into a PostgreSQL database on it&apos;s backend.
              </p>
          </div>
          <div className="flex flex-row items-center md:px-28 px-6">
            <Link
              href="/login"
              className="flex items-center gap-5 self-start w-32 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span className="w-full text-center" >Log in</span>
            </Link>
            <div className="pl-2 leading-none" >You'll be provided with a username and password as a guest</div>
          </div>
          {/* Add Hero Images Here 
          <Image
            src="/hero-desktop.png"
            priority={true}
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />*/}
    </main>
  );
}
