import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
      <div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={'/'}
        >
          
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md 
                             bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 
                             md:flex-none md:justify-start md:p-0 p-2 px-3 border-1 border-gray-500" >
            <div className="md:flex md:flex-row md:relative w-full">
              <div><PowerIcon className="w-6 md:absolute md:left-0" /></div>
              <div className="md:w-full md:text-center hidden md:block">Sign Out</div>
            </div>
          </button>
        </form>
      </div>
  );
}
