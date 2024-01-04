import useRoute from '@/Hooks/useRoute';
import { Track } from '@/types';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

interface Props {
  track: Track;
}

export default function TrackCard({ track }: Props) {
  const route = useRoute();

  return (
    <Link
      href={route('tracks.show', track.slug)}
      className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm md:rounded-xl dark:bg-gray-900 dark:border-gray-700"
    >
      <div className="p-4 md:p-5">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mt-1 shrink-0 w-5 h-5 text-gray-800 dark:text-gray-200"
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

          <div className="grow ml-5">
            <h3 className="group-hover:text-brand-600 font-semibold text-gray-800 dark:text-gray-200">
              {track.name}
            </h3>
            <p className="text-sm text-gray-500">
              Number of Layouts: {track.layouts_count}
            </p>
            <p className="text-sm text-gray-500">
              Total Laps Recorded: {track.laps_count}
            </p>
            {track.fastestLap && (
              <p className="text-sm text-gray-500">
                Track Record:{' '}
                {moment.unix(track.fastestLap.lap_time).format('mm:ss.SSS')}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
