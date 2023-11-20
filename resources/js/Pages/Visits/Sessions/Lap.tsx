import PrimaryButton from '@/Components/PrimaryButton';
import AppLayout from '@/Layouts/AppLayout';
import { TrackVisitSessionLap } from '@/types';
import React, { createContext, useState } from 'react';
import CreateSessionLapForm from '../Partials/CreateSessionLapForm';
import ImportDataModal from '../Partials/ImportDataModal';

export const sessionLapContext = createContext({});

export default function Lap(props: any) {
  const { session } = props;
  const [showImport, setShowImport] = useState(false);
  const [importLaps, setImportLaps] = useState<Array<TrackVisitSessionLap>>([]);
  const [importReady, setImportReady] = useState(false);

  const [laps, setLaps] = useState(session.laps || []);

  const processImport = () => {
    importLaps.map((lap: TrackVisitSessionLap, i: number) => {
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
        if (prevLap) {
          let diff = lap.lap_time - prevLap.lap_time;
          importLaps[i].lap_diff = diff.toFixed(3);
        }
      }
    });
    setImportLaps([...importLaps]);
    setLaps([...laps, ...importLaps]);
  };

  return (
    <AppLayout
      title="Track Visit"
      renderHeader={() => (
        <div className="flex flex-row items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {session.session_name} ({session.session_type})
          </h2>
          <div className="ml-auto">
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
          importLaps,
          setImportLaps,
          importReady,
          setImportReady,
        }}
      >
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="overflow-hidden sm:rounded-lg">
              <CreateSessionLapForm
                session={session}
                laps={laps}
                setLaps={setLaps}
              />
            </div>
          </div>
        </div>

        <ImportDataModal open={showImport} setOpen={setShowImport} />
      </sessionLapContext.Provider>
    </AppLayout>
  );
}
