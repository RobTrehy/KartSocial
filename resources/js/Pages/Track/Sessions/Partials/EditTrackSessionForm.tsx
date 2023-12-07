import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

export default function EditTrackSessionForm(props: any) {
  const { session } = props;
  const route = useRoute();

  const form = useForm({
    _method: 'PUT',
    id: session.id,
    name: session.name,
    session_type: session.session_type,
    length_type: session.length_type,
    length: session.length,
    total_drivers: session.total_drivers,
    order: session.order,
  });

  function updateTrackSession() {
    form.put(
      route('events.sessions.update', {
        event: props.track_event_id,
        session: session.id,
      }),
      {
        errorBag: 'TrackSession',
        preserveScroll: true,
      },
    );
  }

  return (
    <FormSection
      onSubmit={updateTrackSession}
      title={'Track Session'}
      description={`Update the track session, linked to the current event.`}
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
        <InputLabel htmlFor="name" value="Name of the Session" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.target.value)}
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Session Type --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="session_type" value="Type of Session" />
        <select
          id="session_type"
          title="Session Type"
          className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-brand-500 dark:focus:border-brand-600 focus:ring-brand-500 dark:focus:ring-brand-600 rounded-md shadow-sm"
          value={form.data.session_type}
          onChange={e => form.setData('session_type', e.target.value)}
        >
          <option value="Practice">Practice</option>
          <option value="Qualifying">Qualifying</option>
          <option value="Heat">Heat Race</option>
          <option value="Race">Race</option>
          <option value="Semi Final">Semi Final</option>
          <option value="Grand Final">Grand Final</option>
          <option value="Final">Final</option>
        </select>
        <InputError message={form.errors.session_type} className="mt-2" />
      </div>

      {/* <!-- Session Length --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="length" value="Length of the Session" />
        <div className="relative mt-2 rounded-md shadow-sm">
          <TextInput
            id="length"
            type="text"
            className="mt-1 block w-full"
            value={form.data.length}
            onChange={e => form.setData('length', e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="length_type" className="sr-only">
              Session Length Type
            </label>
            <select
              id="length_type"
              name="length_type"
              title="Session Length Type"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-brand-600 md:text-sm"
              value={form.data.length_type}
              onChange={e =>
                form.setData('length_type', e.target.value)
              }
            >
              <option value="Laps">Laps</option>
              <option value="Minutes">Minutes</option>
            </select>
          </div>
        </div>
        <InputError message={form.errors.length} className="mt-2" />
        <InputError
          message={form.errors.length_type}
          className="mt-2"
        />
      </div>

      {/* <!-- Session Position --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="total_drivers" value="Total Drivers" />
        <TextInput
          id="total_drivers"
          type="number"
          className="mt-1 block w-full"
          value={form.data.total_drivers}
          onChange={e => form.setData('total_drivers', e.target.value)}
        />
        <InputError message={form.errors.total_drivers} className="mt-2" />
      </div>
    </FormSection>
  );
}
