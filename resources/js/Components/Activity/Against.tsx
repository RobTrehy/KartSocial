import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Against({ subjectType, subject }: any) {
    const route = useRoute();

    if (subjectType === "App\\Models\\User") {
        return (
            <Link
                href={route('admin:users.show', { user: subject.id })}
                className="flex flex-row gap-x-2 items-center text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white hover:text-brand-500"
            >
                <img src={subject.profile_photo_url} className="w-6 h-6 rounded-md object-cover" alt={subject.alias} />
                {subject.alias}
            </Link>
        )
    }

    if (subjectType === "App\\Models\\Track") {
        return (
            <Link
                href={route('tracks.show', { track: subject.id })}
                className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white hover:text-brand-500"
            >
                {subject.name}
            </Link>
        )
    }

    if (subjectType === "App\\Models\\TrackLayout") {
        return (
            <Link
                href={route('tracks.show', { track: subject.track.id })}
                className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white hover:text-brand-500"
            >
                {subject.track.name}{(subject.name) ? ` - ${subject.name}` : ''}
            </Link>
        )
    }

    if (subjectType === "App\\Models\\TrackVisit") {
        return (
            <Link
                href={route('visits.show', { visit: subject.id })}
                className="text-sm leading-6 whitespace-nowrap truncate text-gray-900 dark:text-white hover:text-brand-500"
            >
                {subject.title}
            </Link>
        )
    }

    if (subjectType === "App\\Models\\TrackSession" && subject) {
        return (
            <Link
                href={route('visits.show', { visit: subject.track_visit_id })}
                className="text-sm leading-6 whitespace-nowrap truncate text-gray-900 dark:text-white hover:text-brand-500"
            >
                {subject.session_name}
            </Link>
        )
    } else if (subjectType === "App\\Models\\TrackSession" && !subject) {
        return (
            <div className="text-sm leading-6 whitespace-nowrap truncate text-gray-900 dark:text-white italic">
                Session has been deleted.
            </div>
        )
    }

}