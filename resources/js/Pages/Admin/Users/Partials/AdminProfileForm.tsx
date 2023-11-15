import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import SearchSelect from '@/Components/Forms/SearchSelect';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  user: User;
  trackSelect: Object;
  selectedTrack: Object;
}

export default function AdminProfileForm({ user, trackSelect, selectedTrack }: Props) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    alias: user.alias,
    weight: user.weight || '',
    home_track_id: user.home_track_id || null
  });
  const route = useRoute();
  const [track, set_track] = useState<object | null>(selectedTrack || null);

  function updateProfile() {
    form.post(route('admin:users.update', { user: user.id }), {
      errorBag: 'updateProfile',
    });
  }

  const clearTrack = () => {
    set_track(null);
    form.setData('home_track_id', null);
  }

  return (
    <FormSection
      onSubmit={updateProfile}
      title={'Profile Details'}
      description={`Update the user's profile details.`}
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

      {/* <!-- Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Alias --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="alias" value="Display Name" />
        <TextInput
          id="alias"
          type="text"
          className="mt-1 block w-full"
          value={form.data.alias}
          onChange={e => form.setData('alias', e.currentTarget.value.replace(/\s/g, ''))}
        />
        <InputError message={form.errors.alias} className="mt-2" />
      </div>

      {/* <!-- Weight --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="weight" value="Weight (KG)" />
        <TextInput
          id="weight"
          type="number"
          step=".1"
          className="mt-1 block w-full"
          value={form.data.weight}
          onChange={e => form.setData('weight', e.currentTarget.value)}
        />
        <InputError message={form.errors.weight} className="mt-2" />
      </div>

      {/* <!-- Home Track ID --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="home_track_id" value="Select your Home Track" />
        <SearchSelect
          value={track}
          onChange={option => { set_track(option); form.setData('home_track_id', option?.value) }}
          options={trackSelect}
          isSearchable
        />
        <div className="text-xs dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer px-2 pt-0.5" onClick={clearTrack}>Clear Home Track</div>
      </div>
    </FormSection>
  );
}
