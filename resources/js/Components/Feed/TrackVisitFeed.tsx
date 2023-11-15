import useRoute from '@/Hooks/useRoute';
import TrackVisitCard from '@/Pages/User/Partials/TrackVisitCard';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function TrackVisitFeed({ feed, profile = false }: any) {
  const page = usePage();
  const route = useRoute();

  if (!feed.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-6">
      {feed.map((visit: any, i: number) => {
        return (
          <div key={i} className="flex flex-row w-full">
            <div className="flex flex-col text-center mx-4 w-32">
              <div className="mx-auto h-20 w-20 p-2 mb-2 rounded-md bg-gray-200 dark:bg-gray-800">
                <img
                  className="h-16 w-16 rounded-md object-cover"
                  src={visit.driver.profile_photo_url}
                  alt={visit.driver.alias}
                />
              </div>
              <Link
                href={route('profile.show', { alias: visit.driver.alias })}
                className="hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-500 truncate"
              >
                {visit.driver.alias}
              </Link>
            </div>
            <TrackVisitCard
              visit={visit}
              auth={page.props.auth}
              profile={profile}
            />
          </div>
        );
      })}
    </div>
  );
}
