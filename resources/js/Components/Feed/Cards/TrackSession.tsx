import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';
import SessionAccordion from './Partials/SessionAccordion';

export default function TrackSession({
  id,
  subject,
  parent,
  user,
  description,
  updated_at,
}: any) {
  const route = useRoute();

  return (
    <FeedCard>
      <FeedHeader user={user} description={description} time={updated_at} />
      <CardTitle>
        {parent.title} at&nbsp;
        <Link
          href={route('tracks.show', { track: parent.track_layout.track.id })}
          className="hover:text-brand-600 dark:hover:text-brand-500"
        >
          {parent.track_layout.track.name}{' '}
          {parent.track_layout.name ? `- ${parent.track_layout.name}` : ''}
        </Link>
      </CardTitle>
      <CardSubtitle>
        {moment(parent.visit_date).format('dddd Do MMMM YYYY [at] HH:mm')}
      </CardSubtitle>
      {parent.notes && <div className="mb-2">{parent.notes}</div>}
      {parent.sessions.length !== 0 && (
        <SessionAccordion visit={parent} profile />
      )}
      <FeedFooter id={id} />
    </FeedCard>
  );
}
