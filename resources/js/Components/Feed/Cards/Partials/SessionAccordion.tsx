import AccordionBody from '@/Components/Accordion/AccordionBody';
import AccordionGroup from '@/Components/Accordion/AccordionGroup';
import AccordionItem from '@/Components/Accordion/AccordionItem';
import AccordionOpenIcon from '@/Components/Accordion/AccordionOpenIcon';
import AccordionSessionTitle from '@/Components/Accordion/AccordionSessionTitle';
import SessionLapsTable from '@/Components/Tables/SessionLapsTable';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import { toOrdinal } from '@/Helpers/ToOrdinal';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function SessionAccordion({ visit, profile }: any) {
    const route = useRoute();
    const page = useTypedPage();
    const { auth } = page.props;

    return (
        <AccordionGroup>
            {
                visit.sessions.map((session: any, i: number) => {
                    return (
                        <AccordionItem key={i}>
                            <AccordionSessionTitle id={session.id}>
                                <div className="flex flex-row items-center gap-x-2">
                                    <AccordionOpenIcon
                                        id={session.id}
                                        closed={
                                            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                        open={
                                            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                    />
                                    {session.session_name}
                                </div>
                            </AccordionSessionTitle>
                            <AccordionBody id={session.id}>
                                <SessionLapsTable session={session} />
                            </AccordionBody>
                            <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x border-t text-xs font-medium text-gray-500 dark:text-gray-500 dark:border-gray-700 dark:divide-gray-700">
                                <div className="px-5 py-0.5">
                                    Session Length: {session.session_length} {session.session_length_type}
                                </div>
                                <div className="px-5 py-0.5">
                                    {session.laps ? session.laps.length : 0} Laps Completed
                                </div>
                                {
                                    session.fastestLap && (
                                        <div className="px-5 py-0.5">
                                            Fastest Lap: {FormatLapTime(session.fastestLap)} on lap {session.fastestLap.lap_number}
                                        </div>
                                    )
                                }
                                {
                                    session.finish_position && session.total_drivers && (
                                        <div className="px-5 py-0.5">
                                            Finished {toOrdinal(session.finish_position)} of {session.total_drivers} drivers
                                        </div>
                                    )
                                }
                                {
                                    visit.user_id === auth.user?.id && !profile && (
                                        <>
                                            <Link
                                                href={route('visits.sessions.edit', { visit: session.track_visit_id, session: session.id })}
                                                className="ml-auto px-5 py-0.5 bg-gray-200 dark:bg-gray-900 text-black dark:text-white"
                                            >
                                                Edit Session
                                            </Link>
                                            <Link
                                                href={route('session.laps', { session: session.id })}
                                                className="px-5 py-0.5 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                                            >
                                                Add/Update Laps
                                            </Link>
                                        </>
                                    )
                                }
                            </div>
                        </AccordionItem>
                    )
                })
            }
        </AccordionGroup>
    )
}