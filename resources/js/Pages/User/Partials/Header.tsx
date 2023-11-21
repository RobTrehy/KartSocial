import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import React from 'react';

interface Props {
  user: User;
  following: boolean;
}

export default function Header({ user, following }: Props) {
  const page = useTypedPage();
  const route = useRoute();

  return (
    <div
      className="w-full md:aspect-[42/9] overflow-hidden bg-center bg-cover relative mb-6 shadow-md"
      style={{
        backgroundImage: `url('${user.cover_photo_url}')`,
      }}
    >
      <div className="bg-black opacity-50 absolute inset-0 overflow-hidden"></div>

      <div className="relative flex flex-col md:flex-row justify-between md:items-end h-full max-w-7xl mt-6 md:mt-0 mx-auto px-4 md:px-6 lg:px-8 pb-6">
        <div className="flex flex-col md:flex-row gap-y-2 gap-x-6 text-gray-800 dark:text-gray-200 md:items-end">
          <div className="h-24 md:h-52 w-24 md:w-52 p-1 rounded-md backdrop-blur-sm bg-white/30">
            <img
              className="h-full w-full rounded-md object-cover"
              src={user.profile_photo_url}
              alt={user.alias}
            />
          </div>
          <div className="text-gray-100 flex flex-col gap-y-2">
            <p className="text-3xl font-bold">{user.alias}</p>
            <div className="flex flex-row gap-x-2 text-md">
              {user.home_track && (
                <Link
                  href={route('tracks.show', { track: user.home_track.id })}
                  className="hover:text-brand-500"
                >
                  {user.home_track.name}
                </Link>
              )}
              {user.home_track && user.weight && (
                <span className="text-gray-400">&bull;</span>
              )}
              {user.weight && <span>{user.weight}KG</span>}
            </div>
            {user.bio && <p className="text-gray-300 max-w-md">{user.bio}</p>}
          </div>
        </div>
        <div className="mt-4 md:w-1/3 text-center md:text-right text-gray-800 dark:text-gray-200">
          <div
            className="inline-flex items-center divide-x divide-gray-300 dark:divide-gray-500 overflow-hidden
                            backdrop-blur-sd
                            bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-100 dark:text-gray-300 uppercase tracking-widest shadow-sm disabled:opacity-25"
          >
            <Link
              href={route('profile.show.follows', { alias: user.alias })}
              className="px-4 py-2 hover:bg-gray-800/80 transition ease-in-out duration-150"
            >
              Follows {user.follows_count}
            </Link>
            <Link
              href={route('profile.show.followers', { alias: user.alias })}
              className="px-4 py-2 hover:bg-gray-800/80 transition ease-in-out duration-150"
            >
              Followed by {user.followed_by_count}
            </Link>
            {page.props.auth.user && (
              <>
                {page.props.auth.user?.id !== user.id && !following && (
                  <span
                    className="px-4 py-2 text-white dark:text-gray-800 cursor-pointer bg-gray-800/80 dark:bg-gray-200/50 hover:bg-gray-700/80 dark:hover:bg-white transition ease-in-out duration-150"
                    onClick={() =>
                      router.put(route('user.follow', { user: user.id }))
                    }
                  >
                    Follow
                  </span>
                )}
                {page.props.auth.user?.id !== user.id && following && (
                  <span
                    className="px-4 py-2 cursor-pointer hover:bg-gray-800/80 transition ease-in-out duration-150"
                    onClick={() =>
                      router.delete(route('user.unfollow', { user: user.id }))
                    }
                  >
                    Unfollow
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
