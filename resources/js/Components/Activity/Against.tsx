import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Against({ objectType, object }: any) {
  const route = useRoute();

  if (!object) {
    return null;
  }

  if (objectType === 'App\\Models\\User') {
    return (
      <Link
        href={route('admin:users.show', { user: object.id })}
        className="flex flex-row gap-x-2 items-center text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white hover:text-brand-500"
      >
        <img
          src={object.profile_photo_url}
          className="w-6 h-6 rounded-md object-cover"
          alt={object.alias}
        />
        {object.alias}
      </Link>
    );
  }

  if (objectType === 'App\\Models\\Track') {
    return (
      <Link
        href={route('tracks.show', { track: object.id })}
        className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white hover:text-brand-500"
      >
        {object.name}
      </Link>
    );
  }

  if (objectType === 'App\\Models\\TrackLayout') {
    return (
      <Link
        href={route('tracks.show', { track: object.track.id })}
        className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white hover:text-brand-500"
      >
        {object.track.name}
        {object.name ? ` - ${object.name}` : ''}
      </Link>
    );
  }

  if (objectType === 'App\\Models\\TrackVisit') {
    return (
      <Link
        href={route('visits.show', { visit: object.id })}
        className="text-sm leading-6 whitespace-nowrap truncate text-gray-900 dark:text-white hover:text-brand-500"
      >
        {object.title}
      </Link>
    );
  }

  if (objectType === 'App\\Models\\TrackSession' && object) {
    return (
      <Link
        href={route('visits.show', { visit: object.track_visit_id })}
        className="text-sm leading-6 whitespace-nowrap truncate text-gray-900 dark:text-white hover:text-brand-500"
      >
        {object.session_name}
      </Link>
    );
  } else if (objectType === 'App\\Models\\TrackSession' && !object) {
    return (
      <div className="text-sm leading-6 whitespace-nowrap truncate text-gray-900 dark:text-white italic">
        Session has been deleted.
      </div>
    );
  }
}
