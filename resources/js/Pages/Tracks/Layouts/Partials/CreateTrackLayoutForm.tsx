import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

export default function CreateTrackLayoutForm({ track }: any) {
  const route = useRoute();

  const form = useForm({
    _method: 'POST',
    is_default: false,
    name: '',
    length: '',
  });

  function createTrackLayout() {
    form.post(route('tracks.layout.store', { track: track.id }), {
      errorBag: 'trackLayoutCreate',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTrackLayout}
      title={`Add Layout`}
      description={`If the track has multiple layouts, you can use this form to create a new one!`}
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
      {/* <!-- Track Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="track_name" value="Track Name" />
        <div className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 px-3 py-2 rounded-md shadow-sm mt-1 block w-full cursor-not-allowed">
          {track.name}
        </div>
      </div>

      {/* <!-- Layout Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Layout Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.target.value)}
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Length --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="length" value="Length (M)" />
        <TextInput
          id="length"
          type="number"
          className="mt-1 block w-full"
          value={form.data.length}
          onChange={e => form.setData('length', e.currentTarget.value)}
        />
        <InputError message={form.errors.length} className="mt-2" />
      </div>
    </FormSection>
  );
}
