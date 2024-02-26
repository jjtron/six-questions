'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Search from '@/app/ui/records/search';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Records View', href: '/records/view/answers', icon: DocumentDuplicateIcon, },
  { name: 'Places View', href: '/records/view/places', icon: DocumentDuplicateIcon, },
  { name: 'Create a 6-answers record', href: '/records/create/answer', icon: UserGroupIcon },
  { name: 'Create a place record (where)', href: '/records/create/place', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('flex border-1 md:basis-12 basis-48 border-gray-500 ' +
                              'rounded-md hover:bg-sky-50 bg-gray-50',
                {
                  'bg-sky-200 text-blue-600': pathname === link.href
                },
              )}
            >
              <div className="flex place-content-center md:self-center grow">
                <LinkIcon className="flex-row basis-6 md:shrink-0 md:inline"/>
                <p className="flex-row grow mr-6 hidden md:inline md:text-center">{link.name}</p>
              </div>
            </Link>
        );
      })}
    </>
  );
}