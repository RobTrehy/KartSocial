import { FormatLapDiff } from '@/Helpers/FormatLapDiff';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import { Driver, TrackVisitSessionLap } from '@/types';
import React from 'react';

interface Props {
  driver: Driver;
}

export default function LapsTable({ driver }: Props) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
        {driver?.laps.length >= 1 ? driver.laps.map((lap: TrackVisitSessionLap, i: number) => {
          return (
            <tr
              key={i}
              className={`${lap.lap_number === driver.fastest_lap?.lap_number
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
        }) : (
          <tr>
            <td className="px-6 py-2 whitepsace-nowrap text-sm text-center text-gray-800 dark:text-gray-200" colSpan={3}>
              No laps recorded!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
