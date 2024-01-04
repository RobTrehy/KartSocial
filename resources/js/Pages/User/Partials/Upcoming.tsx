import useRoute from '@/Hooks/useRoute';
import { TrackEvent } from '@/types';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

export default function Upcoming({ user }: any) {
  const route = useRoute();
  let upCount = 0;

  return (
    <ul className="flex flex-col text-gray-800 dark:text-white">
      <li className="items-center gap-x-2 py-3 px-4 text-center font-semibold bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
        Upcoming Track Events
      </li>
      {user.track_events.map((event: TrackEvent, i: number) => {
        if (moment().diff(moment(event.date)) < 0) {
          upCount++;
          return (
            <li
              key={i}
              className="items-center gap-x-2 py-3 px-4 bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700 "
            >
              <Link
                href={route('events.show', { track: event.track_layout.track.slug, event: event.slug })}
                className="font-semibold hover:text-brand-600"
              >
                {event.name}
              </Link>{' '}
              {moment(event.date).fromNow()} at{' '}
              {event.track_layout.track.name}
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {moment(event.date).format('DD/MM/YYYY HH:mm')}
              </span>
            </li>
          );
        }
      })}
      {upCount === 0 && (
        <li className="items-center gap-x-2 py-3 px-4 text-sm bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
          Nothing Recorded!
        </li>
      )}
    </ul>
  );
}
