import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormatLapDiff } from '@/Helpers/FormatLapDiff';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import useRoute from '@/Hooks/useRoute';
import { TrackVisitSession, TrackVisitSessionLap } from '@/types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';

interface Props {
  session: TrackVisitSession;
  laps: Array<TrackVisitSessionLap>;
  setLaps: any;
}

export default function CreateSessionLapForm(props: Props) {
  const route = useRoute();

  const [timeFocus, setTimeFocus] = useState<number | null>(null);
  const [deleteBin, setDeleteBin] = useState<Array<TrackVisitSessionLap>>([]);

  const form = useForm({
    _method: 'PUT',
    session_id: props.session.id,
    laps: props.laps,
  });

  useEffect(() => {
    form.setData('laps', props.laps);
  }, [props.laps]);

  const createSessionLap = () => {
    if (deleteBin.length) {
      deleteBin.map((lap: TrackVisitSessionLap, i: number) => {
        axios.delete(
          route('session.lap.destroy', {
            session: props.session.id,
            lap: lap.id,
          }),
        );
      });
    }
    form.post(route('session.laps.update', { session: props.session.id }), {
      errorBag: 'sessionLap',
      preserveScroll: true,
    });
  };

  const addNewLap = () => {
    props.setLaps([
      ...props.laps,
      {
        lap_number: props.laps.length
          ? +props.laps[props.laps.length - 1].lap_number + 1
          : '1',
        lap_time: '0',
        lap_diff: '',
      },
    ]);
  };

  const changeLapTimeValue = (e: ChangeEvent<HTMLInputElement>) => {
    let i = e.target.id.split('-')[1];

    if (isNaN(+e.target.value[e.target.value.length - 1])) {
      return;
    }

    let frames = '000';
    let secs = '00';
    let mins = '00';

    if (e.target.value.length === 10) {
      // This must have a better way!
      let v = e.target.value.slice(1).split(/:|\./);
      frames = v[2][1] + v[2][2] + v[2][3];
      secs = v[1][1] + v[2][0];
      mins = v[0] + v[1][0];
    } else if (e.target.value.length === 8) {
      let v = e.target.value.split(/:|\./);
      mins = '0' + v[0][0];
      secs = v[0][1] + v[1][0];
      frames = v[1][1] + v[2][0] + v[2][1];
    }

    props.laps[i].lap_time = +mins * 60 + +secs + '.' + frames;

    if (props.laps[i].lap_number != '1' && i !== '0') {
      props.laps[i].lap_diff = (
        props.laps[i].lap_time - props.laps[+i - 1].lap_time
      ).toFixed(3);
    }

    calculateDiffs();
    props.setLaps([...props.laps]);
  };

  const maskedLapTime = (i: number) => {
    let time: string = props.laps[i].lap_time.toString();
    if (time === '0') {
      return '00:00.000';
    } else {
      let split = time.toString().split('.');

      let frames = split[1];
      let mins = Math.floor(+(split[0]) / 60);
      let secs = +(split[0]) - mins * 60;

      return (
        mins.toString().padStart(2, '0') +
        ':' +
        secs.toString().padStart(2, '0') +
        '.' +
        frames.toString().padEnd(3, '0')
      );
    }
  };

  const lapTimeFocus = (
    e: FocusEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>,
  ) => {
    let i = e.currentTarget.id.split('-')[1];
    setTimeFocus(+i);
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    );
  };

  const lapTimeBlur = (i: number) => {
    props.laps[i].lap_time = props.laps[i].lap_time
      .split(':')
      .reduce((acc: number, time: number) => 60 * acc + +time);
    calculateDiffs();
    props.setLaps([...props.laps]);
    setTimeFocus(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      return;
    }
  };

  const moveLapUp = (i: number) => {
    if (i === 0) {
      return;
    }

    let lap = props.laps[i];
    lap.lap_number = i;
    props.laps[i - 1].lap_number = i + 1;

    props.laps.splice(i, 1);
    props.laps.splice(i - 1, 0, lap);

    calculateDiffs();
    props.setLaps([...props.laps]);
  };

  const moveLapDown = (i: number) => {
    if (i === props.laps.length - 1) {
      return;
    }

    let lap = props.laps[i];
    lap.lap_number = i + 2;
    props.laps[i + 1].lap_number = i + 1;
    props.laps.splice(i, 1);
    props.laps.splice(i + 1, 0, lap);

    calculateDiffs();
    props.setLaps([...props.laps]);
  };

  const deleteLap = (i: number) => {
    if (props.laps[i]?.id) {
      deleteBin.push(props.laps[i]);
      setDeleteBin([...deleteBin]);
    }

    props.laps.splice(i, 1);

    // Reset lap numbers
    props.laps.map((lap: TrackVisitSessionLap, i: number) => {
      props.laps[i].lap_number = i + 1;
    });

    calculateDiffs();
    props.setLaps([...props.laps]);
  };

  const calculateDiffs = () => {
    props.laps.map((lap: TrackVisitSessionLap, i: number) => {
      if (lap.lap_number != 1 && i !== 0) {
        props.laps[i].lap_diff = +(
          props.laps[i].lap_time - props.laps[i - 1].lap_time
        ).toFixed(3);
      } else {
        props.laps[i].lap_diff = null;
      }
    });
  }

  return (
    <FormSection
      onSubmit={createSessionLap}
      title={'Session Laps'}
      description={`Add lap data to your session.`}
      noGrid
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >
      <div className="flex bg-gray-100 dark:bg-gray-900 dark:text-white text-xs mb-1.5 rounded-md">
        <div className="w-24 px-3">Lap</div>
        <div className="w-full flex">
          <div className="w-full px-3">Time</div>
          <div className="w-32 px-3">Diff.</div>
          <div className="w-12 px-3">&nbsp;</div>
        </div>
      </div>
      {props.laps?.map((lap: TrackVisitSessionLap, i: number) => {
        return (
          <div className="flex mb-1.5 items-center" key={i}>
            <div className="border border-gray-300 dark:border-gray-800 shadow-sm rounded-l-md py-2 px-3 w-24 bg-gray-100 dark:bg-gray-600 flex justify-between items-center">
              {lap.lap_number}
              <button
                type="button"
                className={`py-0.5 ${i === 0
                  ? 'text-gray-800 cursor-not-allowed'
                  : 'hover:text-blue-500'
                  }`}
                onClick={() => moveLapUp(i)}
                title="Move Lap Up"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={`py-0.5 ${i === props.laps.length - 1
                  ? 'text-gray-800 cursor-not-allowed'
                  : 'hover:text-green-500'
                  }`}
                onClick={() => moveLapDown(i)}
                title="Move Lap Down"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full flex">
              <TextInput
                id={`lap_time-${i}`}
                type="text"
                value={timeFocus === i ? maskedLapTime(i) : FormatLapTime(lap)}
                className="border-l-0 rounded-none w-full"
                onChange={changeLapTimeValue}
                onFocus={lapTimeFocus}
                onClick={lapTimeFocus}
                onBlur={() => lapTimeBlur(i)}
                onKeyDown={handleKeyDown}
              />
              {lap.lap_number != 1 ? (
                <div
                  className={`border-y border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 shadow-sm py-2 px-3 w-full md:w-32 ${lap.lap_diff && lap.lap_diff < 0
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-red-100 dark:bg-red-900'
                    }`}
                >
                  {FormatLapDiff(lap)}
                </div>
              ) : (
                <div className="border-y border-gray-300 dark:border-gray-800 shadow-sm py-2 px-3 w-full md:w-32 bg-gray-100 dark:bg-gray-600">
                  &nbsp;
                </div>
              )}
              <div className="border border-gray-300 dark:border-gray-800 shadow-sm rounded-r-md py-2 px-3 w-12 bg-gray-100 dark:bg-gray-600 flex justify-between items-center">
                <button
                  type="button"
                  className="py-0.5 hover:text-red-500"
                  onClick={() => deleteLap(i)}
                  title="Delete Lap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="w-24 text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-white text-xs mb-1.5 rounded-md px-3"
        onClick={addNewLap}
      >
        Add Lap
      </button>
    </FormSection>
  );
}
