import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React, { ReactElement } from 'react';

interface Props {
  user: {
    alias: string;
    profile_photo_url: string;
  };
  description: string | ReactElement;
  time: string;
}

export default function FeedHeader({ user, description, time }: Props) {
  const route = useRoute();

  return (
    <div className="flex flex-row items-center gap-x-2 mb-2">
      <img
        className="h-10 w-10 rounded-md object-cover"
        src={user.profile_photo_url}
        alt={user.alias}
      />
      <div className="flex flex-col text-sm">
        <p>
          <Link
            href={route('profile.show', { alias: user.alias })}
            className="hover:text-brand-600 dark:hover:text-brand-500 font-semibold truncate"
          >
            {user.alias}
          </Link>
          &nbsp;
          {description}
        </p>
        <p className="text-gray-400 text-xs">{moment(time).fromNow()}</p>
      </div>
    </div>
  );
}
