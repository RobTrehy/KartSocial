// import SessionLapsTable from '@/Components/Tables/SessionLapsTable';
import AccordionBody from '@/Elements/Accordion/AccordionBody';
import AccordionGroup from '@/Elements/Accordion/AccordionGroup';
import AccordionItem from '@/Elements/Accordion/AccordionItem';
import AccordionOpenIcon from '@/Elements/Accordion/AccordionOpenIcon';
import AccordionSessionTitle from '@/Elements/Accordion/AccordionSessionTitle';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { TrackEvent, TrackSession } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import ResponsiveSessionResultsAccordion from './ResponsiveSessionResultsAccordion';
import SessionResultsAccordion from './SessionResultsAccordion';

interface Props {
    event: TrackEvent;
    profile?: Boolean;
    startClosed?: Boolean;
}

export default function SessionAccordion({ event, profile, startClosed = false }: Props) {
    const route = useRoute();
    const page = useTypedPage();
    const { auth } = page.props;

    return (
        <AccordionGroup defaultOpen={!(startClosed) && event.sessions.length === 1 ? event.sessions[0].id : undefined}>
            {event.sessions.map((session: TrackSession, i: number) => {
                return (
                    <AccordionItem key={i}>
                        <AccordionSessionTitle id={session.id}>
                            <div className="flex flex-row items-center gap-x-2">
                                <AccordionOpenIcon id={session.id} />
                                {session.name}
                            </div>
                        </AccordionSessionTitle>
                        <AccordionBody id={session.id}>
                            <div className="hidden md:block">
                                <SessionResultsAccordion session={session} />
                            </div>
                            <div className="block md:hidden">
                                <ResponsiveSessionResultsAccordion session={session} />
                            </div>
                        </AccordionBody>
                        <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x text-xs font-medium text-gray-500 dark:text-gray-500 dark:border-gray-700 dark:divide-gray-700">
                            <div className="px-5 py-0.5 w-full md:w-auto text-center">
                                Session Length: {session.length}{' '}{session.length_type}
                            </div>
                            {session.fastest_lap && (
                                <div className="px-5 py-0.5 w-full md:w-auto text-center">
                                    Fastest Lap: {FormatLapTime(session.fastest_lap)} on lap{' '}
                                    {session.fastest_lap.lap_number} by {session.fastest_lap.driver.alias}
                                </div>
                            )}
                            {event.user_id === auth.user?.id && !profile && (
                                <div className="flex flex-col md:flex-row w-full md:w-auto md:ml-auto">
                                    <Link
                                        href={route('events.sessions.edit', {
                                            track: event.track_layout.track.slug,
                                            event: event.slug,
                                            session: session.id,
                                        })}
                                        className="w-full md:w-auto text-center px-5 py-0.5 bg-gray-200 dark:bg-gray-900 text-black dark:text-white"
                                    >
                                        Edit Session
                                    </Link>
                                    <Link
                                        href={route('events.sessions.drivers', {
                                            track: event.track_layout.track.slug,
                                            event: event.slug,
                                            session: session.id,
                                        })}
                                        className="w-full md:w-auto text-center px-5 py-0.5 bg-brand-600 dark:bg-brand-500 text-white"
                                    >
                                        Manage Drivers
                                    </Link>
                                </div>
                            )}
                        </div>
                    </AccordionItem>
                );
            })}
        </AccordionGroup>
    );
}
