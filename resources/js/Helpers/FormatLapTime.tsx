import moment from 'moment';

export function FormatLapTime(lap: object) {
  return moment.unix(lap.lap_time).format('mm:ss.SSS');
}
