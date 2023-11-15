import { Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  link: {
    active: boolean;
    url: string;
    label: string;
  };
}

export default function PaginationLink({ link }: Props) {
  return link.active ? (
    <Link
      href={link.url}
      aria-current="page"
      className="relative z-10 inline-flex items-center bg-brand-600 px-3 py-1 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:focus-visible:outline-gray-700"
    >
      {link.label}
    </Link>
  ) : (
    <Link
      href={link.url}
      className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
    >
      {link.label}
    </Link>
  );
}
