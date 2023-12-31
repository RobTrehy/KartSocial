import TrackLayoutChart from '@/Components/Charts/TrackLayoutChart';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import SecondaryButton from '@/Components/SecondaryButton';
import { FormatLapDiff } from '@/Helpers/FormatLapDiff';
import { FormatLapTime } from '@/Helpers/FormatLapTime';
import usePermissions from '@/Hooks/usePermissions';
import useRoute from '@/Hooks/useRoute';
import { Track, TrackLayout } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';

interface Props {
  layout: TrackLayout;
  track: Track;
}

export default function TrackLayoutCard({ layout, track }: Props) {
  const permissions = usePermissions();
  const route = useRoute();
  const form = useForm();

  const [slide, setSlide] = useState<number>(0);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  function confirmDeletion() {
    setConfirmingDeletion(true);
  }

  function deleteLayout() {
    form.delete(
      route('tracks.layout.destroy', {
        track: track.slug,
        layout: layout.id,
      }),
      {
        preserveScroll: true,
        onSuccess: () => closeModal(),
      },
    );
  }

  function reinstateLayout() {
    form.post(
      route('tracks.layout.reinstate', {
        track: track.slug,
        layout: layout.id,
      }),
      {
        preserveScroll: true,
      },
    );
  }

  function closeModal() {
    setConfirmingDeletion(false);
  }

  return (
    <div className="w-full md:flex mb-6">
      <div className="flex w-full md:w-1/2 p-10 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 items-center">
        <div className="flex flex-col w-full h-full">
          {layout.fastest_lap && (
            <div className="flex flex-col md:flex-row gap-2 w-full items-center md:items-end mb-2 md:mb-6">
              <div className="flex flex-col text-center md:text-left">
                <p className="font-semibold">Layout Record</p>
                <span className="block leading-none text-3xl text-gray-800 dark:text-gray-100">
                  {FormatLapTime(layout.fastest_lap)}
                </span>
                <p className="text-xs">
                  by&nbsp;
                  <Link
                    href={route('profile.show', {
                      alias: layout.fastest_lap.driver.alias,
                    })}
                    className="hover:text-brand-600"
                  >
                    {layout.fastest_lap.driver.alias}
                  </Link>
                  &nbsp;on{' '}
                  {moment(
                    layout.fastest_lap.session.track_event.date,
                  ).format('Do MMM YYYY')}
                </p>
              </div>
              {layout.myFastest && (
                <div className="flex flex-col text-center md:text-right md:ml-6">
                  <p className="font-semibold">Personal Best</p>
                  <span className="block leading-none text-3xl text-gray-800 dark:text-gray-100">
                    {FormatLapTime(layout.myFastest)}
                  </span>
                  <p className="text-xs">
                    on{' '}
                    {moment(
                      layout.fastest_lap.session.track_event.date,
                    ).format('Do MMM YYYY')}
                  </p>
                </div>
              )}
              {layout.myFastest &&
                layout.myFastest.lap_time === layout.fastest_lap.lap_time && (
                  <div className="flex flex-col">
                    <span className="block leading-5 text-sm md:ml-4 text-green-500">
                      0.000
                    </span>
                    <p className="text-xs">&nbsp;</p>
                  </div>
                )}
              {layout.myFastest &&
                layout.myFastest.lap_time > layout.fastest_lap.lap_time && (
                  <div className="flex flex-col">
                    <span className="block leading-5 text-sm md:ml-4 text-red-500">
                      {FormatLapDiff({
                        lap_number: 0,
                        lap_diff:
                          layout.myFastest.lap_time -
                          layout.fastest_lap.lap_time,
                      })}
                    </span>
                    <p className="text-xs">&nbsp;</p>
                  </div>
                )}
            </div>
          )}
          <div className="flex flex-col text-sm w-full">
            <div className="flex flex-col md:flex-row gap-x-2 w-full items-center mb-2">
              <div className="flex w-full md:w-1/2">
                <div className="pr-3 w-1/2 font-semibold text-right md:text-left">Total Laps</div>
                <div className="px-3 w-1/2">{layout.laps_count}</div>
              </div>
              <div className="flex w-full md:w-1/2">
                <div className="pr-3 w-1/2 font-semibold text-right md:text-left">Your Laps</div>
                <div className="px-3 w-1/2">{layout.my_laps_count}</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-x-2 w-full items-center">
              {layout.length && (
                <div className="flex w-full md:w-1/2">
                  <div className="pr-3 w-1/2 font-semibold text-right md:text-left">Layout Length</div>
                  <div className="px-3 w-1/2">{layout.length}M</div>
                </div>
              )}
              {layout.length && layout.my_laps_count > 0 && (
                <div className="flex w-full md:w-1/2">
                  <div className="pr-3 w-1/2 font-semibold text-right md:text-left">You've Driven</div>
                  <div className="px-3 w-1/2">
                    {(
                      (layout.length * layout.my_laps_count) /
                      1000
                    ).toPrecision(4)}
                    KM
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row text-xs gap-x-2 -mb-8 mx-auto md:mt-auto md:-m-8">
            {permissions.includes('tracks.layouts.update') && (
              <button
                onClick={() =>
                  router.visit(
                    route('tracks.layout.edit', {
                      track: track.slug,
                      layout: layout.id,
                    }),
                  )
                }
                className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-1.5 py-2 rounded-md transition duration-500"
              >
                Edit Details
              </button>
            )}
            {!layout.is_default && !layout.retired_at && (
              <>
                {permissions.includes('tracks.layouts.set_default') && (
                  <button
                    onClick={() =>
                      router.post(
                        route('tracks.layout.set_default', {
                          track: track.slug,
                          layout: layout.id,
                        }),
                      )
                    }
                    className="text-brand-500 hover:bg-brand-500 hover:text-white px-1.5 py-2 rounded-md transition duration-500"
                  >
                    Make Default Layout
                  </button>
                )}
                {permissions.includes('tracks.layouts.destroy') && (
                  <button
                    onClick={confirmDeletion}
                    className="text-red-500 hover:bg-red-500 hover:text-white px-1.5 py-2 rounded-md transition duration-500"
                  >
                    Retire Layout
                  </button>
                )}
              </>
            )}
            {permissions.includes('tracks.layouts.restore') &&
              layout.retired_at && (
                <button
                  onClick={reinstateLayout}
                  className="text-brand-500 hover:bg-brand-500 hover:text-white px-1.5 py-2 rounded-md transition duration-500"
                >
                  Reinstate Layout
                </button>
              )}
          </div>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 px-5 py-4 bg-brand-500 text-white text-center items-center">
        <div className="flex flex-row items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition duration-500"
            onClick={() => setSlide(slide === 0 ? 1 : slide - 1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          {slide === 0 && (
            <TrackLayoutChart
              chartData={layout.chartData?.fastest}
              title="Fastest Laps"
            />
          )}
          {slide === 1 && (
            <TrackLayoutChart
              chartData={layout.chartData?.myFastest}
              title="My Fastest Laps"
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition duration-500"
            onClick={() => setSlide(slide === 1 ? 0 : slide + 1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/* <!-- Delete Confirmation Modal --> */}
      <DialogModal isOpen={confirmingDeletion} onClose={closeModal}>
        <DialogModal.Content title={'Retire Layout'}>
          Are you sure you want to retire this layout? Once the layout is
          retired, no-one will be able to record new laps against this layout.
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
          {permissions.includes('tracks.layouts.destroy') && (
            <DangerButton
              onClick={deleteLayout}
              className={classNames('ml-2', { 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              Retire Layout
            </DangerButton>
          )}
        </DialogModal.Footer>
      </DialogModal>
    </div>
  );
}
