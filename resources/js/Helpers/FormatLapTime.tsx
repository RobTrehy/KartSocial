import { TrackSessionLap, TrackVisitSessionLap } from '@/types';
import moment from 'moment';

export function FormatLapTime(lap: TrackVisitSessionLap | TrackSessionLap) {
  return moment.unix(lap.lap_time).format('mm:ss.SSS');
}
