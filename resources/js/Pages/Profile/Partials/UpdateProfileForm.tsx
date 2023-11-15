import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import SearchSelect from '@/Components/Forms/SearchSelect';
import TextInput from '@/Components/Forms/TextInput';
import TextareaInput from '@/Components/Forms/TextareaInput';
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

export default function UpdateProfileForm({ user, trackSelect, selectedTrack }: Props) {
  const form = useForm({
    _method: 'PUT',
    alias: user.alias,
    bio: user.bio || '',
    weight: user.weight || '',
    home_track_id: user.home_track_id || null
  });
  const route = useRoute();
  const [track, set_track] = useState<object | null>(selectedTrack || null);

  function updateProfile() {
    form.post(route('user-profile.update'), {
      errorBag: 'updateProfile',
    });
  }

  return (
    <FormSection
      onSubmit={updateProfile}
      title={'Profile Details'}
      description={`Update your account's profile.`}
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

      {/* <!-- Bio --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="bio" value="Bio" />
        <div className="relative">
          <TextareaInput
            id="bio"
            type="text"
            className="mt-1 block w-full"
            value={form.data.bio}
            onChange={e => form.setData('bio', e.currentTarget.value)}
            rows="3"
          />
          <span className="absolute bottom-1 right-1 text-xs text-gray-400">{form.data.bio.length}/120</span>
        </div>
        <InputError message={form.errors.bio} className="mt-2" />
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
      </div>
    </FormSection>
  );
}
