import SessionLapsTable from '@/Components/Tables/SessionLapsTable';
import AccordionBody from '@/Elements/Accordion/AccordionBody';
import AccordionGroup from '@/Elements/Accordion/AccordionGroup';
import AccordionItem from '@/Elements/Accordion/AccordionItem';
import AccordionOpenIcon from '@/Elements/Accordion/AccordionOpenIcon';
import AccordionSessionTitle from '@/Elements/Accordion/AccordionSessionTitle';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import { toOrdinal } from '@/Helpers/ToOrdinal';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { TrackVisit, TrackVisitSession } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  visit: TrackVisit;
  profile: Boolean;
}

export default function SessionAccordion({ visit, profile }: Props) {
  const route = useRoute();
  const page = useTypedPage();
  const { auth } = page.props;

  return (
    <AccordionGroup>
      {visit.sessions.map((session: TrackVisitSession, i: number) => {
        return (
          <AccordionItem key={i}>
            <AccordionSessionTitle id={session.id}>
              <div className="flex flex-row items-center gap-x-2">
                <AccordionOpenIcon
                  id={session.id}
                  closed={
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 8.85999L14.5 8.85998"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 15.36L8 2.35999"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                  open={
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 8.85999L14.5 8.85998"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                />
                {session.session_name}
              </div>
            </AccordionSessionTitle>
            <AccordionBody id={session.id}>
              <SessionLapsTable session={session} />
            </AccordionBody>
            <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x border-t text-xs font-medium text-gray-500 dark:text-gray-500 dark:border-gray-700 dark:divide-gray-700">
              <div className="px-5 py-0.5 w-full md:w-auto text-center">
                Session Length: {session.session_length}{' '}
                {session.session_length_type}
              </div>
              <div className="px-5 py-0.5 w-full md:w-auto text-center">
                {session.laps ? session.laps.length : 0} Laps Completed
              </div>
              {session.fastestLap && (
                <div className="px-5 py-0.5 w-full md:w-auto text-center">
                  Fastest Lap: {FormatLapTime(session.fastestLap)} on lap{' '}
                  {session.fastestLap.lap_number}
                </div>
              )}
              {session.finish_position && session.total_drivers && (
                <div className="px-5 py-0.5 w-full md:w-auto text-center">
                  Finished {toOrdinal(session.finish_position)} of{' '}
                  {session.total_drivers} drivers
                </div>
              )}
              {visit.user_id === auth.user?.id && !profile && (
                <div className="flex flex-col md:flex-row w-full md:w-auto md:ml-auto">
                  <Link
                    href={route('visits.sessions.edit', {
                      visit: session.track_visit_id,
                      session: session.id,
                    })}
                    className="w-full md:w-auto text-center px-5 py-0.5 bg-gray-200 dark:bg-gray-900 text-black dark:text-white"
                  >
                    Edit Session
                  </Link>
                  <Link
                    href={route('session.laps', { session: session.id })}
                    className="w-full md:w-auto text-center px-5 py-0.5 bg-brand-600 dark:bg-brand-500 text-white"
                  >
                    Add/Update Laps
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
