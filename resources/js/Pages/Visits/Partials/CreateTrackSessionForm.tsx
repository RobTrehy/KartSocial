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

export default function CreateTrackSessionForm(props: any) {
  const route = useRoute();

  const form = useForm({
    _method: 'POST',
    track_visit_id: props.track_visit_id,
    session_order: props.order,
    session_name: '',
    session_type: 'Practice',
    session_length_type: 'Minutes',
    session_length: '15',
    total_drivers: '1',
    finish_position: '1',
  });

  function createTrackSession() {
    form.post(route('visits.sessions.store', { visit: props.track_visit_id }), {
      errorBag: 'trackSession',
      preserveScroll: true,
      onSuccess: result => console.log(result),
    });
  }

  return (
    <FormSection
      onSubmit={createTrackSession}
      title={'Track Session'}
      description={`Create a new track session, linked to the current visit.`}
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
      {/* <!-- Session Name --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="session_name" value="Session Name" />
        <TextInput
          id="session_name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.session_name}
          onChange={e => form.setData('session_name', e.target.value)}
        />
        <InputError message={form.errors.session_name} className="mt-2" />
      </div>

      {/* <!-- Session Type --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="session_type" value="Session Type" />
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
        <InputLabel htmlFor="session_length" value="Session Length" />
        <div className="relative mt-2 rounded-md shadow-sm">
          <TextInput
            id="session_length"
            type="text"
            className="mt-1 block w-full"
            value={form.data.session_length}
            onChange={e => form.setData('session_length', e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="session_length_type" className="sr-only">
              Session Length Type
            </label>
            <select
              id="session_length_type"
              name="session_length_type"
              title="Session Length Type"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-brand-600 md:text-sm"
              value={form.data.session_length_type}
              onChange={e =>
                form.setData('session_length_type', e.target.value)
              }
            >
              <option value="Laps">Laps</option>
              <option value="Minutes">Minutes</option>
            </select>
          </div>
        </div>
        <InputError message={form.errors.session_length} className="mt-2" />
        <InputError
          message={form.errors.session_length_type}
          className="mt-2"
        />
      </div>

      {/* <!-- Session Position --> */}
      <div className="col-span-6 md:col-span-4">
        <div className="flex flex-row">
          <label
            className="w-1/2 font-medium text-sm text-gray-700 dark:text-gray-300"
            htmlFor="finish_position"
          >
            Your Position
          </label>
          <label
            className="w-1/2 font-medium text-sm text-gray-700 dark:text-gray-300"
            htmlFor="total_drivers"
          >
            Total Drivers
          </label>
        </div>

        <div className="flex flex-row">
          <TextInput
            id="finish_position"
            type="text"
            className="mt-1 block w-1/2 rounded-r-none"
            value={form.data.finish_position}
            onChange={e => form.setData('finish_position', e.target.value)}
          />
          <TextInput
            id="total_drivers"
            type="text"
            className="mt-1 block w-1/2 rounded-l-none"
            value={form.data.total_drivers}
            onChange={e => form.setData('total_drivers', e.target.value)}
          />
        </div>
        <InputError message={form.errors.finish_position} className="mt-2" />
        <InputError message={form.errors.total_drivers} className="mt-2" />
      </div>
    </FormSection>
  );
}
