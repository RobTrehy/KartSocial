import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function ResultItemPerson({ result }: any) {
  const route = useRoute();

  return (
    <Link
      href={route('profile.show', { alias: result.alias })}
      className="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex flex-row gap-x-4 items-center"
    >
      <img
        src={result.profile_photo_url}
        className="w-10 h-10 rounded-md"
        alt={result.alias}
      />
      <div className="font-semibold hover:text-brand-500">{result.alias}</div>
    </Link>
  );
}
