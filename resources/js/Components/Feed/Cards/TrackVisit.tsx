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

export default function TrackVisit({ id, user, description, subject, updated_at }: any) {
    const route = useRoute();

    let visit = subject;

    return (
        <FeedCard>
            <FeedHeader
                user={user}
                description={description}
                time={updated_at}
            />

            <CardTitle>
                {visit.title} at&nbsp;
                <Link
                    href={route('tracks.show', { track: visit.track_layout.track.id })}
                    className="hover:text-brand-600 dark:hover:text-brand-500"
                >
                    {visit.track_layout.track.name} {(visit.track_layout.name) ? `- ${visit.track_layout.name}` : ''}
                </Link>
            </CardTitle>
            <CardSubtitle>
                {moment(visit.visit_date).format("dddd Do MMMM YYYY [at] HH:mm")}
            </CardSubtitle>
            {visit.notes && <div className="mb-2">{visit.notes}</div>}
            {visit.sessions.length !== 0 && <SessionAccordion visit={visit} profile />}
            <FeedFooter id={id} />
        </FeedCard>
    )
}