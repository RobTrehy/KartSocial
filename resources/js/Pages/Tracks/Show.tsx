import TrackVisitFeed from '@/Components/Feed/TrackVisitFeed';
import usePermissions from '@/Hooks/usePermissions';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Track, TrackLayout } from '@/types';
import { router } from '@inertiajs/react';
import { Map, Marker } from 'pigeon-maps';
import React, { useState } from 'react';
import TrackLayoutCard from './Partials/TrackLayoutCard';

interface Props {
  track: Track;
  layouts: Array<TrackLayout>;
}

export default function Index({ track, layouts }: Props) {
  const permissions = usePermissions();
  const route = useRoute();
  const [layout, setLayout] = useState<number>(0);

  return (
    <AppLayout title={track.name}>
      <div className="w-full md:aspect-[42/9] overflow-hidden bg-brand-700 relative mb-6 shadow-md">
        {track.lat && track.lng && (
          <div className="absolute inset-0">
            <Map defaultCenter={[+track.lat, +track.lng]} defaultZoom={13}>
              <Marker
                width={50}
                anchor={[+track.lat, +track.lng]}
                hover={false}
              />
            </Map>
          </div>
        )}
        <div className="bg-black opacity-60 absolute inset-0"></div>

        <div className="relative flex flex-col md:flex-row justify-between items-end h-full max-w-7xl mt-6 md:mt-0 mx-auto px-4 md:px-6 lg:px-8 pb-6">
          <div className="flex flex-row gap-x-6 text-gray-800 dark:text-gray-200 items-end">
            <div className="text-gray-100 flex flex-col gap-y-2">
              <p className="text-3xl font-bold">{track.name}</p>
              {(track.address_1 ||
                track.town ||
                track.county ||
                track.postal_code) && (
                <p className="text-gray-300 max-w-md">
                  {track.address_1}
                  {track.address_2 ? ', ' : ''}
                  {track.address_2}
                  {track.address_3 ? ', ' : ''}
                  {track.address_3}
                  {track.town ? ', ' : ''}
                  {track.town}
                  {track.county ? ', ' : ''}
                  {track.county}
                  {track.postal_code ? ', ' : ''}
                  {track.postal_code}
                </p>
              )}
              <div className="flex flex-col md:flex-row gap-x-2 text-md">
                {track.url && (
                  <a
                    href={track.url}
                    target="_blank"
                    rel="nofollow"
                    className="hover:text-brand-500"
                  >
                    {track.url}
                  </a>
                )}
                {track.url && track.number && (
                  <span className="hidden md:inline-block text-gray-400">&bull;</span>
                )}
                {track.number && (
                  <a
                    href={`tel:${track.number}`}
                    className="hover:text-brand-500"
                    target="_blank"
                    rel="nofollow"
                  >
                    {track.number}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 w-full md:w-1/3 text-center md:text-right text-gray-800 dark:text-gray-200">
            {(permissions.includes('tracks.layouts.create') ||
              permissions.includes('tracks.layouts.update')) && (
              <div className="inline-flex items-center divide-x divide-gray-300 dark:divide-gray-500 overflow-hidden backdrop-blur-sd bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-100 dark:text-gray-300 uppercase tracking-widest shadow-sm disabled:opacity-25">
                {permissions.includes('tracks.layouts.create') && (
                  <span
                    className="px-4 py-2 cursor-pointer hover:bg-gray-50/20 dark:hover:bg-gray-700/50 transition ease-in-out duration-150"
                    onClick={() =>
                      router.visit(
                        route('tracks.layout.create', { track: track.id }),
                      )
                    }
                  >
                    Add Layout
                  </span>
                )}
                {permissions.includes('tracks.layouts.update') && (
                  <span
                    className="px-4 py-2 cursor-pointer hover:bg-gray-50/20 dark:hover:bg-gray-700/50 transition ease-in-out duration-150"
                    onClick={() =>
                      router.visit(route('tracks.edit', { track: track.id }))
                    }
                  >
                    Update Details
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pb-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {track.fastestLap &&
            track.fastestLap?.lap_time === track.myFastest?.lap_time && (
              <div className="text-center mb-6 md:pb-8 lg:px-4">
                <div
                  className="p-2 bg-brand-800 items-center text-brand-100 leading-none lg:rounded-full flex flex-col gap-y-2 md:flex-row lg:inline-flex"
                  role="alert"
                >
                  <span className="flex items-center gap-x-2 rounded-full bg-brand-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                    Congratulations!
                  </span>
                  <span className="font-semibold mr-2 text-left flex-auto">
                    You hold the track record on Kart Social!
                  </span>
                </div>
              </div>
            )}

          {layouts.length > 1 && (
            <div className="flex flex-row justify-between items-center mb-4">
              <button
                type="button"
                className="flex w-12"
                onClick={() =>
                  setLayout(layout === 0 ? layouts.length - 1 : layout - 1)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer text-gray-600 hover:text-brand-500 transition duration-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                <span className="sr-only">Previous Layout</span>
              </button>
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold">
                  {layouts[layout].name} Layout
                </p>
                <p className="text-gray-500 text-xs">
                  {!layouts[layout].retired_at && !layouts[layout].is_default
                    ? 'Alternate Layout '
                    : ''}
                  {layouts[layout].retired_at ? (
                    <span className="text-red-500">Retired Layout </span>
                  ) : (
                    ''
                  )}
                  ({layout + 1}/{layouts.length})
                </p>
              </div>
              <button
                type="button"
                className="flex w-12"
                onClick={() =>
                  setLayout(layout === layouts.length - 1 ? 0 : layout + 1)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer text-gray-600 hover:text-brand-500 transition duration-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span className="sr-only">Next Layout</span>
              </button>
            </div>
          )}

          <TrackLayoutCard layout={layouts[layout]} track={track} />
          {track.feed.length > 0 && (
            <>
              <h2 className="mt-10 mb-4 px-4 font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Latest Activity
              </h2>
              <TrackVisitFeed feed={track.feed} profile />
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
