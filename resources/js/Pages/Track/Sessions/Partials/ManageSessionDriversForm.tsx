import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputHelp from '@/Components/Forms/InputHelp';
import InputLabel from '@/Components/Forms/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import UserSearch from '@/Components/Search/UserSearch';
import { toOrdinal } from '@/Helpers/ToOrdinal';
import useRoute from '@/Hooks/useRoute';
import { Driver, TrackEvent, TrackSession } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

interface Props {
  event: TrackEvent;
  session: TrackSession
};

export default function ManageSessionDriversForm(props: Props) {
  const { session } = props;
  const route = useRoute();

  const form = useForm({
    _method: 'PUT',
    id: session.id,
    drivers: session.drivers,
  });

  function updateSessionDrivers() {
    form.put(
      route('events.sessions.drivers.update', {
        track: props.event.track_layout.track.slug,
        event: props.event.slug,
        session: session.id,
      }),
      {
        errorBag: 'TrackSession',
      },
    );
  }

  const addDriver = (driver: Driver, position: number) => {
    form.setData('drivers', [
      ...form.data.drivers.filter((_driver: Driver) => _driver.id !== driver.id),
      { ...driver, pivot: { track_session_id: form.data.id, user_id: driver.id, position: position } }
    ]);
  }

  const Drivers = () => {
    const d: Array<any> = [];
    for (let i = 0; i < session.total_drivers; i++) {
      if (form.data.drivers.find((driver: Driver) => driver.pivot.position === i + 1)) {
        d.push(
          <div key={i} className="flex flex-row relative py-2 mt-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm overflow-hidden">
            <div className="pl-2 py-2 -my-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-300 w-12 flex items-center">
              {toOrdinal(i + 1)}
            </div>
            <div className="pl-3 flex flex-row">
              <div className="bg-brand-300 dark:bg-brand-900 rounded-l-md text-sm py-0.5 px-1">
                {form.data.drivers.find((driver: Driver) => driver.pivot.position === i + 1)?.alias}
              </div>
              <div
                className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-700 dark:hover:bg-brand-600 rounded-r-md text-sm py-0.5 px-2 cursor-pointer"
                onClick={() => form.setData('drivers', form.data.drivers.filter((driver: Driver) => driver.pivot.position !== i + 1))}
              >
                X
              </div>
            </div>
          </div>
        )
      } else {
        d.push(
          <div key={i} className="relative mt-2 rounded-md shadow-sm">
            <div className="absolute inset-y-0 pl-2 rounded-l-md bg-gray-300 dark:bg-gray-700 dark:text-gray-300 w-12 flex items-center">
              {toOrdinal(i + 1)}
            </div>
            <UserSearch inputClasses="pl-14" onResultClick={(driver: Driver) => addDriver(driver, i + 1)} />
          </div>
        )
      }
    }
    return d;
  }

  return (
    <FormSection
      onSubmit={updateSessionDrivers}
      title={'Manage Drivers'}
      description={`Add or remove drivers from this session.`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save Changes
          </PrimaryButton>
        </>
      )}
    >
      {/* <!-- Session Name --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="name" value="Drivers" />
        <Drivers />
        <InputHelp className="mt-2">
          Leave the name blank if the user is not on Kart Social.
        </InputHelp>
      </div>
    </FormSection>
  );
}
