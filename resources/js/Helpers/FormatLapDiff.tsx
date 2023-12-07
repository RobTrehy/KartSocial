import { TrackSessionLap, TrackVisitSessionLap } from '@/types';
import moment from 'moment';
import React from 'react';

export function FormatLapDiff(lap: TrackVisitSessionLap|TrackSessionLap, text: boolean = true) {
  if (lap.lap_number != 1 && lap.lap_diff) {
    if (lap.lap_diff <= -60 || lap.lap_diff >= 60) {
      if (lap.lap_diff < 0) {
        return (
          <div className={text ? 'text-green-500' : ''}>
            -{moment.unix(Math.abs(lap.lap_diff)).format('mm:ss.SSS')}
          </div>
        );
      } else {
        return (
          <div className={text ? 'text-red-500' : ''}>
            {moment.unix(lap.lap_diff).format('mm:ss.SSS')}
          </div>
        );
      }
    } else if (lap.lap_diff < 0) {
      return (
        <div className={text ? 'text-green-500' : ''}>
          -{moment.unix(Math.abs(lap.lap_diff)).format('ss.SSS')}
        </div>
      );
    } else {
      return (
        <div className={text ? 'text-red-500' : ''}>
          {moment.unix(lap.lap_diff).format('ss.SSS')}
        </div>
      );
    }
  }
}
