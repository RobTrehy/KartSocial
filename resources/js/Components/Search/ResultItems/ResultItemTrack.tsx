import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function ResultItemTrack({ result }: any) {
  const route = useRoute();

  return (
    <Link
      href={route('tracks.show', { track: result.id })}
      className="py-2 px-3 group hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex flex-row gap-x-4 items-center"
    >
      <div className="w-10 h-10 bg-brand-200 dark:bg-brand-800 rounded-md flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-brand-800 dark:text-brand-200 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold group-hover:text-brand-500">{result.name}</div>
        <div className="text-xs">
          {result.address_1} {result.address_2} {result.address_3} {result.town}{' '}
          {result.county} {result.postal_code}
        </div>
      </div>
    </Link>
  );
}
