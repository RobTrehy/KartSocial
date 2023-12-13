import SessionAccordion from '@/Components/Accordions/SessionAccordion';
import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';

export default function TrackSession({
  id,
  object,
  parent,
  properties,
  user,
  description,
  updated_at,
}: any) {
  const route = useRoute();

  return (
    <FeedCard>
      <FeedHeader user={user} description={description} time={updated_at} />
      <CardTitle>
        <Link
          href={route('events.show', { event: parent.id })}
          className="hover:text-brand-600 dark:hover:text-brand-500"
        >
          {parent.name}
        </Link>
        &nbsp;at&nbsp;
        <Link
          href={route('tracks.show', { track: properties.track.id })}
          className="hover:text-brand-600 dark:hover:text-brand-500"
        >
          {properties.track.name}{' '}
          {properties.track_layout.name ? `- ${properties.track_layout.name}` : ''}
        </Link>
      </CardTitle>
      <CardSubtitle>
        {moment(parent.date).format('dddd Do MMMM YYYY [at] HH:mm')}
      </CardSubtitle>
      {parent.description && <div className="mb-2">{parent.description}</div>}
      {parent.sessions.length !== 0 && (
        <SessionAccordion event={parent} profile startClosed />
      )}
      <FeedFooter id={id} />
    </FeedCard>
  );
}
