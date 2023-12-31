import { FormatLapDiff } from '@/Helpers/FormatLapDiff';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import { TrackSession, TrackVisitSession, TrackVisitSessionLap } from '@/types';
import React from 'react';

interface Props {
  session: TrackVisitSession|TrackSession;
}

export default function SessionLapsTable({ session }: Props) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-t dark:border-gray-700">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-1.5 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Lap
          </th>
          <th
            scope="col"
            className="px-6 py-1.5 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Lap Time
          </th>
          <th
            scope="col"
            className="px-6 py-1.5 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Delta
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {session.laps.map((lap: TrackVisitSessionLap, i: number) => {
          return (
            <tr
              key={i}
              className={`${lap.lap_number === session.fastest_lap?.lap_number
                  ? 'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-800 dark:hover:bg-yellow-900 font-bold'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
            >
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {lap.lap_number}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {FormatLapTime(lap)}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {FormatLapDiff(lap)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
