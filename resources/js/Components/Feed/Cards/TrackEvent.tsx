import SessionAccordion from '@/Components/Accordions/SessionAccordion';
import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import useRoute from '@/Hooks/useRoute';
import { TrackEvent as TrackEventType, User } from '@/types';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';

interface Props {
  id: number;
  object: TrackEventType;
  user: User;
  event: string;
  description: string;
  properties: {
    lap: {
      lap_time: number;
      lap_number: number;
    };
    track: {
      name: string;
      slug: string;
    };
    track_layout: {
      name: string;
    };
  };
  updated_at: string;
}

export default function TrackEvent({
  id,
  user,
  description,
  object,
  properties,
  updated_at,
}: Props) {
  const route = useRoute();

  let event: TrackEventType = object;

  return (
    <FeedCard>
      <FeedHeader user={user} description={description} time={updated_at} />

      <CardTitle>
        <Link
          href={route('events.show', { track: properties.track.slug, event: event.slug })}
          className="hover:text-brand-600 dark:hover:text-brand-500"
        >
          {event.name}
        </Link>
        &nbsp;at&nbsp;
        <Link
          href={route('tracks.show', { track: properties.track.slug })}
          className="hover:text-brand-600 dark:hover:text-brand-500"
        >
          {properties.track.name}{' '}
          {properties.track_layout.name ? `- ${properties.track_layout.name}` : ''}
        </Link>
      </CardTitle>
      <CardSubtitle>
        {moment(event.date).format('dddd Do MMMM YYYY [at] HH:mm')}
      </CardSubtitle>
      {event.description && <div className="mb-2">{event.description}</div>}
      {event.sessions && event.sessions.length !== 0 && (
        <SessionAccordion event={event} profile startClosed />
      )}
      <FeedFooter id={id} />
    </FeedCard>
  );
}
