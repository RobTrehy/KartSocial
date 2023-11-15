import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Welcome() {
  const route = useRoute();

  return (
    <div>
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent rounded-md">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Welcome to Kart Social!
        </h1>

        <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
          Kart Social is a social platform for go-kart racers to record, share
          and compare their lap times!
          <br />
          If you're seeing this page, we're hoping it's because you're new to
          our platform. We'd normally show you a feed of recent activity from
          people that you follow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <h1 className="text-xl font-bold text-center col-span-1 md:col-span-2 pt-6 lg:pt-8 dark:text-white">
          Where to start?
        </h1>

        <Link
          href={route('user-profile.edit')}
          className="px-6 lg:px-8 py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-500 rounded-md"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 stroke-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              Setup your profile
            </h2>
          </div>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Your profile needs some more information that we didn't ask for when
            you registered!
            <br />
            Along with the traditional profile and cover photos, we'd love to
            know your home track and your weight.
            <br />
            If you're already regretting the display name you chose, you can
            also change it here!
          </p>
        </Link>

        <Link
          href={route('visits.create')}
          className="px-6 lg:px-8 py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-500 rounded-md"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 stroke-gray-400"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              Log a Track Visit
            </h2>
          </div>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            In order to share your lap times, you start by recording a visit to
            a track!
            <br />
            You can record visits both in the past and in the future, so people
            viewing your profile can see when you're planning to go too!
            <br />
            Once you've got a visit recorded, you can add multiple sessions, and
            record lap times from each - we have a couple of ways of importing
            your lap times, to keep it quick and easy!
          </p>
        </Link>

        <div className="px-6 lg:px-8 py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-500 rounded-md cursor-not-allowed">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 stroke-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              Follow Your Friends
            </h2>
          </div>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Your rivals too!
            <br />
            We can't link you to this one, you'll need to use the search bar at
            the top! You can search for people by their email address or display
            name.
            <br />
            You'll be linked to their profile page and have the option to follow
            them. When they record a track visit, the details will show in your
            dashboard feed!
          </p>
        </div>

        <Link
          href={route('tracks.index')}
          className="px-6 lg:px-8 py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-500 rounded-md"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 stroke-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>

            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              Discover New Tracks
            </h2>
          </div>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Whilst we don't have an exhaustive database of every track in the
            country, it is rather large!
            <br />
            If there is a track near to you that isn't in our database
            currently, there is an option to add it! We'd really appreciate
            that!
          </p>
        </Link>
      </div>
    </div>
  );
}
