import Pagination from '@/Components/Pagination/Pagination';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

export default function Index({ trackVisits }: any) {
  const route = useRoute();

  return (
    <AppLayout
      title="User Track Visits - Admin"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          User Track Visits
        </h2>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ul
            role="list"
            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 border-x border-gray-200 dark:border-gray-700 rounded-t-md"
          >
            <li>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-x-6 p-2 bg-gray-200 dark:bg-gray-700 rounded-t-md">
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Visit
                </p>
                <p className="hidden sm:block text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Track
                </p>
                <div className="hidden md:grid grid-cols-2 text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  <p>Sessions</p>
                  <p>Laps</p>
                </div>
              </div>
            </li>
            {trackVisits.data.map((visit: any) => (
              <Link
                key={visit.id}
                href={route('visits.show', { visit: visit.id })}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-x-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      {visit.title}
                    </p>
                    <p className="truncate text-sm leading-5 text-gray-500 dark:text-gray-400">
                      {moment(visit.visit_date).format(
                        'Do MMMM YYYY [at] HH:mm',
                      )}
                    </p>
                    <p className="block sm:hidden text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                      {visit.track_layout.track.name}
                      {visit.track_layout.name
                        ? ` - ${visit.track_layout.name}`
                        : ''}
                    </p>
                  </div>
                </div>
                <p className="hidden sm:block text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {visit.track_layout.track.name}
                  {visit.track_layout.name
                    ? ` - ${visit.track_layout.name}`
                    : ''}
                </p>
                <div className="hidden md:grid grid-cols-2 text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  <p>{visit.sessions.length}</p>
                  <p>
                    {visit.sessions.map((session: any, i: number) => (
                      <span
                        key={i}
                        className="after:content-['/'] last:after:content-['']"
                      >
                        {session.laps.length}
                      </span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}
          </ul>
          <div className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-b-md border-t border-gray-200 dark:border-gray-700">
            <Pagination data={trackVisits} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
