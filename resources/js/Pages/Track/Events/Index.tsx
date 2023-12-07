import Pagination from '@/Components/Pagination/Pagination';
import SecondaryButton from '@/Components/SecondaryButton';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

interface Props {
  events: Array<TrackEvent>;
}

export default function Index({ events }: Props) {
  const route = useRoute();

  return (
    <AppLayout
      title="My Events"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            My Events
          </h2>
          <div className="flex gap-x-2">
            <SecondaryButton
              onClick={() => router.visit(route('events.create'))}
            >
              Add New
            </SecondaryButton>
          </div>
        </div>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 border-x border-gray-200 dark:border-gray-700 md:rounded-md">
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-x-6 p-2 rounded-t-md">
              <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                Visit
              </p>
              <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                Track
              </p>
              <div className="grid grid-cols-3 text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                <p>Sessions</p>
                <p>Laps</p>
                <p>Fastest Lap</p>
              </div>
            </div>

            {events.data.map((event: any) => (
              <Link
                key={event.id}
                href={route('events.show', { event: event.id })}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-x-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      {event.name}
                    </p>
                    <p className="truncate text-sm leading-5 text-gray-500 dark:text-gray-400">
                      {moment(event.date).format(
                        'Do MMMM YYYY [at] HH:mm',
                      )}
                    </p>
                    <p className="block md:hidden text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                      {event.track_layout.track.name}
                      {event.track_layout.name
                        ? ` - ${event.track_layout.name}`
                        : ''}
                    </p>
                  </div>
                </div>
                <p className="hidden md:block text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {event.track_layout.track.name}
                  {event.track_layout.name
                    ? ` - ${event.track_layout.name}`
                    : ''}
                </p>
                <div className="hidden md:grid grid-cols-3 items-center text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  <p>{event.sessions.length}</p>
                  <p>
                    {event.sessions.map((session: any, i: number) => (
                      <span
                        key={i}
                        className="after:content-['/'] last:after:content-['']"
                      >
                        {session.laps.length}
                      </span>
                    ))}
                  </p>
                  <p>{event.fastestLap && FormatLapTime(event.fastestLap)}<br />
                    <span className="truncate text-sm leading-5 text-gray-500 dark:text-gray-400">
                      by {event.fastestLap.driver.alias}</span>
                  </p>
                </div>
              </Link>
            ))}

            <div className="px-2 py-0.5 rounded-b-md border-t border-gray-200 dark:border-gray-700">
              <Pagination data={events} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
