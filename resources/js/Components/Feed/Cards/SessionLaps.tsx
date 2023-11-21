import CardTitle from '@/Components/Cards/CardTitle';
import SessionLapsTable from '@/Components/Tables/SessionLapsTable';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import { toOrdinal } from '@/Helpers/ToOrdinal';
import React, { useState } from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';

export default function SessionLaps({
  id,
  subject,
  user,
  description,
  updated_at,
}: any) {
  const [reveal, setReveal] = useState<boolean>(false);

  return (
    <FeedCard>
      <FeedHeader user={user} description={description} time={updated_at} />
      <div className="border dark:border-gray-700 rounded-md py-2">
        <div className="px-2 mb-2">
          <CardTitle>{subject.session_name}</CardTitle>
        </div>

        <div className={reveal ? 'relative' : 'h-28 overflow-hidden relative'}>
          <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x border-t text-xs font-medium text-gray-500 dark:text-gray-500 dark:border-gray-700 dark:divide-gray-700">
            <div className="px-5 py-0.5 w-full md:w-auto text-center">
              Session Length: {subject.session_length}{' '}
              {subject.session_length_type}
            </div>
            <div className="px-5 py-0.5 w-full md:w-auto text-center">
              {subject.laps ? subject.laps.length : 0} Laps Completed
            </div>
            {subject.fastestLap && (
              <div className="px-5 py-0.5 w-full md:w-auto text-center">
                Fastest Lap: {FormatLapTime(subject.fastestLap)} on lap{' '}
                {subject.fastestLap.lap_number}
              </div>
            )}
            {subject.finish_position && subject.total_drivers && (
              <div className="px-5 py-0.5 w-full md:w-auto text-center">
                Finished {toOrdinal(subject.finish_position)} of{' '}
                {subject.total_drivers} drivers
              </div>
            )}
          </div>
          <SessionLapsTable session={subject} />
          <div
            className={
              reveal
                ? 'border-t dark:border-gray-700 pt-1'
                : 'absolute bottom-0 inset-x-0'
            }
          >
            <button
              title={reveal ? 'Show less' : 'Show more'}
              onClick={() => setReveal(!reveal)}
              className="flex bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full w-6 h-6 mx-auto"
            >
              {reveal ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <FeedFooter id={id} />
    </FeedCard>
  );
}
