import Card from '@/Components/Cards/Card';
import CardBody from '@/Components/Cards/CardBody';
import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import SessionAccordion from '@/Components/Feed/Cards/Partials/SessionAccordion';
import useRoute from '@/Hooks/useRoute';
import { TrackVisit } from '@/types';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

interface Props {
  visit: TrackVisit;
  profile: Boolean;
}

export default function TrackVisitCard({ visit, profile = false }: Props) {
  const route = useRoute();
  return (
    <Card>
      <CardTitle>
        {visit.title} at&nbsp;
        <Link
          href={route('tracks.show', { track: visit.track_layout.track?.id })}
          className="hover:text-brand-600 dark:hover:text-brand-500"
        >
          {visit.track_layout.track?.name}{' '}
          {visit.track_layout.name ? `- ${visit.track_layout.name}` : ''}
        </Link>
      </CardTitle>
      <CardSubtitle>
        {moment(visit.visit_date).format('dddd Do MMMM YYYY [at] HH:mm')}
      </CardSubtitle>
      <CardBody>
        {visit.notes && <div className="mb-2">{visit.notes}</div>}
        {visit.sessions.length !== 0 && (
          <SessionAccordion visit={visit} profile={profile} />
        )}
      </CardBody>
    </Card>
  );
}
