import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import useOnScreen from '@/Hooks/useOnScreen';
import { TrackEvent, TrackSession, User } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';

// @ts-ignore
import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import confetti from 'canvas-confetti';

interface Props {
  id: number;
  object: TrackSession;
  parent: TrackEvent;
  user: User;
  event: string;
  description: string;
  properties: {
    lap: {
      lap_time: number;
      lap_number: number;
    };
    track?: {
      id: number;
      name: string;
    };
    layout?: {
      name: string;
    };
  };
  updated_at: string;
}

export default function TrackRecord({
  id,
  object,
  parent,
  user,
  event,
  description,
  properties,
  updated_at,
}: Props) {
  const route = useRoute();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const [fired, setFired] = useState<boolean>(false);

  useEffect(() => {
    if (onScreen && !fired) {
      fire();
      setFired(true);
    }
  }, [onScreen]);

  const fire = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 1 },
    });
  };

  return (
    <FeedCard>
      <FeedHeader user={user} description={description} time={updated_at} />
      <div
        className="border dark:border-gray-700 rounded-md text-center py-2"
        ref={ref}
        onClick={() => fire()}
      >
        <div className="px-2 mb-2">
          <CardTitle>
            {event === 'track_record' ? (
              <Link
                href={route('tracks.show', { track: properties.track?.id })}
                className="hover:text-brand-500"
              >
                {properties.track?.name}
              </Link>
            ) : null}
            {event === 'layout_record' ? (
              <Link
                href={route('tracks.show', { track: properties.track?.id })}
                className="hover:text-brand-500"
              >
                {properties.layout?.name
                  ? `${properties.track?.name} - ${properties.layout?.name}`
                  : properties.track?.name}
              </Link>
            ) : null}
            {event === 'personal_record' ? 'New Personal Record!' : null}
          </CardTitle>
          <CardSubtitle>
            {event === 'personal_record'
              ? properties.layout?.name
                ? `${properties.track?.name} - ${properties.layout.name}`
                : properties.track?.name
              : object.session_name}
          </CardSubtitle>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-24 h-24 fill-yellow-600 mx-auto"
        >
          <path
            fillRule="evenodd"
            d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-xl">{FormatLapTime(properties.lap)}</p>
        <p className="text-sm">
          Set on lap {properties.lap.lap_number}<br />
          During {object.name} of&nbsp;
          <Link
            href={route('events.show', { event: parent.id })}
            className="hover:text-brand-600 dark:hover:text-brand-500 hover:font-semibold"
          >
            {parent.name}
          </Link>
        </p>
      </div>
      <FeedFooter id={id} />
    </FeedCard>
  );
}
