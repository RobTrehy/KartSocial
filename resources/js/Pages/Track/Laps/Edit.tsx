import PrimaryButton from '@/Components/PrimaryButton';
import SectionBorder from '@/Components/SectionBorder';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { Driver, TrackEvent, TrackSession, TrackSessionLap } from '@/types';
import moment from 'moment';
import React, { createContext, useEffect, useState } from 'react';
import CreateLapForm from './Partials/CreateLapForm';
import ImportDataModal from './Partials/ImportDataModal';

export const sessionLapContext = createContext({});

interface Props {
  event: TrackEvent;
}

export default function Edit(props: Props) {
  const page = useTypedPage();
  const { event } = props;
  const [showImport, setShowImport] = useState<Boolean>(false);
  const [importSession, setImportSession] = useState<number>(event.sessions[0].id);
  const [importLaps, setImportLaps] = useState<Array<any>>([]);
  const [importReady, setImportReady] = useState<Boolean>(false);

  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (event.sessions.length > 0) {
      event.sessions.map((session: TrackSession, i: number) => {
        if (session.drivers.filter((driver: Driver) => driver.id === page.props.auth.user?.id)[0]) {
          updateLaps(session.drivers.filter((driver: Driver) => driver.id === page.props.auth.user?.id)[0].laps, session.id)
        }
      });
    }
  }, [event]);

  const processImport = () => {
    importLaps.map((lap: TrackSessionLap, i: number) => {
      if (isNaN(lap.lap_time)) {
        importLaps[i].lap_time = lap.lap_time
          .split(':')
          .reduce((acc: number, time: number) => 60 * acc + +time)
          .toString();
      }
      if (lap.lap_number.toString() !== '1') {
        let prevLap = importLaps[i - 1]
          ? importLaps[i - 1]
          : laps[laps.length - 1];
        if (prevLap.lap_time) {
          let diff = lap.lap_time - prevLap.lap_time;
          importLaps[i].lap_diff = diff.toFixed(3);
        }
      }
    });
    setImportLaps([...importLaps]);
    let _laps = laps[importSession] || [];
    updateLaps([..._laps, ...importLaps], importSession);
  };

  const updateLaps = (session_laps: Array<TrackSessionLap>, session_id: number) => {
    laps[session_id] = session_laps;
    setLaps([...laps]);
  }

  return (
    <AppLayout
      title="Track Visit"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              My Laps
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {event.name} at {event.track_layout.track.name} {event.track_layout.name} on{' '}
              {moment(event.date).format('dddd Do MMMM YYYY [at] HH:mm')}
            </p>
          </div>
          <div className="flex gap-x-2">
            <PrimaryButton onClick={() => setShowImport(true)}>
              Import Data
            </PrimaryButton>
          </div>
        </div>
      )}
    >
      <sessionLapContext.Provider
        value={{
          processImport,
          importSession,
          setImportSession,
          importLaps,
          setImportLaps,
          importReady,
          setImportReady,
        }}
      >
        <div className="py-4 md:py-12">
          <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
            {
              event.sessions.length > 0 && event.sessions.map((session: TrackSession, i: number) => (
                <div className="mt-10 md:mt-0" key={i}>
                  <CreateLapForm
                    event={event}
                    session={session}
                    laps={laps[session.id] || []}
                    setLaps={updateLaps}
                  />

                  {i < (event.sessions.length - 1) && <SectionBorder />}
                </div>
              ))
            }
          </div>
        </div>

        <ImportDataModal open={showImport} setOpen={setShowImport} event={event} />
      </sessionLapContext.Provider>
    </AppLayout>
  );
}
