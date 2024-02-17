'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Records',
    href: '/records',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Create 6-answers Record', href: '/records/create/answer', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  let pathexp = "null";
  let mypath: any = [];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
                'md:min-h-20': link.href ==='/records/create/answer',
              },
            )}
          >
            <LinkIcon className={clsx(
                {'w-6': link.href !='/records/create/answer'},
                {'w-6 md:w-12': link.href ==='/records/create/answer'})} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
    
  );
}
