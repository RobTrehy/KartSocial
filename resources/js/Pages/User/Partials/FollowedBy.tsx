import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function FollowedBy({ user }: any) {
  const route = useRoute();

  if (user.followed_by_count === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 py-3 px-4 bg-white border -mt-px rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <p className="text-md font-semibold">Followers</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.followed_by_count} Followers
          </p>
        </div>
        <Link
          href={route('profile.show.followers', { alias: user.alias })}
          className="text-sm font-normal text-brand-500 hover:text-brand-800 transition ease-in-out duration-150"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3 font-semibold">
        {user.followed_by.map((follower: any, i: number) => (
          <Link
            href={route('profile.show', { alias: follower.alias })}
            key={i}
            className="flex flex-col gap-1 group"
          >
            <img
              src={follower.profile_photo_url}
              className="rounded-md w-full h-full object-cover"
              alt={user.alias}
            />
            <p className="text-sm text-center truncate pb-0.5 group-hover:text-brand-500">
              {follower.alias}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
