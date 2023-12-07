import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Auth, TrackVisit } from '@/types';
import { router } from '@inertiajs/react';
import React from 'react';
import TrackVisitCard from '../User/Partials/TrackVisitCard';

interface Props {
  visit: TrackVisit;
  auth: Auth;
}

export default function Show({ visit, auth }: Props) {
  const route = useRoute();
  console.log(visit);
  return (
    <AppLayout
      title="Track Visit"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Track Visit
          </h2>
          <div className="flex gap-x-2">
            {visit?.user_id === auth.user?.id && (
              <>
                <SecondaryButton
                  onClick={() =>
                    router.visit(route('visits.edit', { visit: visit.id }))
                  }
                >
                  Edit Visit
                </SecondaryButton>
                <SecondaryButton
                  onClick={() =>
                    router.visit(
                      route('visits.sessions.create', { visit: visit.id }),
                    )
                  }
                >
                  Add Session
                </SecondaryButton>
              </>
            )}
          </div>
        </div>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
            <div className="w-full flex flex-col">
              <TrackVisitCard visit={visit} profile={!(visit.user_id === auth.user?.id)} />
            </div>
            <div className="w-full md:w-96 px-0 flex flex-col gap-y-4">
              <ul className="flex flex-col text-gray-800 dark:text-white">
                <li className="items-center gap-x-2 py-3 px-4 text-center font-semibold bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
                  Linked Track Visits
                </li>
                {/* {
                  (visit.linked_visits.length > 0) && visit.linked_visits.map((visit: TrackVisit, i: number) => (
                    <li
                      key={i}
                      className="items-center gap-x-2 py-3 px-4 bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700 "
                    >
                      {visit.title} by {visit.driver.alias}
                      <p>Fastest Lap: {FormatLapTime(visit.fastestLap)}</p>
                      <p>Set during {visit.fastestLap.session.session_name} on lap {visit.fastestLap.lap_number}</p>
                      <p>Compare</p>
                    </li>
                  ))
                } */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
