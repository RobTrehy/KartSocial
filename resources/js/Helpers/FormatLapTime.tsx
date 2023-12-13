import { TrackSessionLap } from '@/types';
import moment from 'moment';

interface CustomLap {
  lap_time: number;
}

export function FormatLapTime(lap: TrackSessionLap|CustomLap) {
  return moment.unix(lap.lap_time).format('mm:ss.SSS');
}
