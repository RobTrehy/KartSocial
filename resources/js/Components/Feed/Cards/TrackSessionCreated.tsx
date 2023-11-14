import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';

export default function TrackSessionCreated({ group, item }: any) {
    const [laps, setLaps] = useState<number>(0);

    const { parent, user } = item;

    useEffect(() => {
        if (parent.sessions) {
            parent.sessions.map((session: any, i: number) => {
                if (!session.counted) {
                    setLaps(laps + session.laps_count);
                }
                parent.sessions[i].counted = true;
            });
        }
    }, [parent]);

    return (
        <FeedCard>
            <FeedHeader
                user={user}
                description={<>added {parent.sessions.length} Track {(parent.sessions.length === 1) ? 'Session' : 'Sessions'}</>}
                time={item.updated_at}
            />
            <div className="border dark:border-gray-700 rounded-md p-2">
                <CardTitle>
                    {parent.title} at {parent.track_layout.track.name} {(parent.track_layout.name) ? `- ${parent.track_layout.name}` : ''}
                </CardTitle>
                <CardSubtitle>
                    {moment(parent.visit_date).format("dddd Do MMMM YYYY [at] HH:mm")}
                </CardSubtitle>
                <div className="mt-2 text-xs text-gray-800 dark:text-gray-400">
                    {
                        (parent.sessions.length > 0) && <span>{parent.sessions.length} {(parent.sessions.length === 1) ? 'Session' : 'Sessions'} covering {laps} laps. </span>
                    }
                    {
                        parent.fastestLap && <span>Fastest Lap: {FormatLapTime(parent.fastestLap)}</span>
                    }
                </div>
            </div>
            <FeedFooter id={item.id} />
        </FeedCard>
    )
}