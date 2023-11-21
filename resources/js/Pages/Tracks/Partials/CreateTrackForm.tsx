import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import Select from '@/Components/Forms/Select';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

export default function CreateTrackForm() {
  const route = useRoute();

  const form = useForm({
    _method: 'POST',
    name: '',
    address_1: '',
    address_2: '',
    address_3: '',
    town: '',
    county: '',
    postal_code: '',
    type: 'Outdoor',
    url: '',
    number: '',
  });

  function createTrack() {
    form.post(route('tracks.store'), {
      errorBag: 'trackCreate',
      preserveScroll: true,
      onSuccess: result => console.log(result),
    });
  }

  return (
    <FormSection
      onSubmit={createTrack}
      title={'New Track'}
      description={`Visited a track that is not on our system? Submit it here!`}
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
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="name" value="Track Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.target.value)}
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Address 1 --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="address_1" value="Address Line 1" />
        <TextInput
          id="address_1"
          type="text"
          className="mt-1 block w-full"
          value={form.data.address_1}
          onChange={e => form.setData('address_1', e.currentTarget.value)}
        />
        <InputError message={form.errors.address_1} className="mt-2" />
      </div>

      {/* <!-- Address 2 --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="address_2" value="Address Line 2" />
        <TextInput
          id="address_2"
          type="text"
          className="mt-1 block w-full"
          value={form.data.address_2}
          onChange={e => form.setData('address_2', e.currentTarget.value)}
        />
        <InputError message={form.errors.address_2} className="mt-2" />
      </div>

      {/* <!-- Address 3 --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="address_3" value="Address Line 3" />
        <TextInput
          id="address_3"
          type="text"
          className="mt-1 block w-full"
          value={form.data.address_3}
          onChange={e => form.setData('address_3', e.currentTarget.value)}
        />
        <InputError message={form.errors.address_3} className="mt-2" />
      </div>

      {/* <!-- Town --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="town" value="Town" />
        <TextInput
          id="town"
          type="text"
          className="mt-1 block w-full"
          value={form.data.town}
          onChange={e => form.setData('town', e.currentTarget.value)}
        />
        <InputError message={form.errors.town} className="mt-2" />
      </div>

      {/* <!-- County --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="county" value="County" />
        <TextInput
          id="county"
          type="text"
          className="mt-1 block w-full"
          value={form.data.county}
          onChange={e => form.setData('county', e.currentTarget.value)}
        />
        <InputError message={form.errors.county} className="mt-2" />
      </div>

      {/* <!-- Post Code --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="postal_code" value="Post Code" />
        <TextInput
          id="postal_code"
          type="text"
          className="mt-1 block w-full"
          value={form.data.postal_code}
          onChange={e => form.setData('postal_code', e.currentTarget.value)}
        />
        <InputError message={form.errors.postal_code} className="mt-2" />
      </div>

      {/* <!-- Track Type --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="type" value="Track Type" />
        <Select
          id="type"
          className="mt-1 block w-full"
          value={form.data.type}
          onChange={e => form.setData('type', e.currentTarget.value)}
        >
          <option>Indoor</option>
          <option>Outdoor</option>
        </Select>
        <InputError message={form.errors.type} className="mt-2" />
      </div>

      {/* <!-- URL --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="url" value="Website" />
        <TextInput
          id="url"
          type="text"
          className="mt-1 block w-full"
          value={form.data.url}
          onChange={e => form.setData('url', e.currentTarget.value)}
        />
        <InputError message={form.errors.url} className="mt-2" />
      </div>

      {/* <!-- Number --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="number" value="Phone Number" />
        <TextInput
          id="number"
          type="text"
          className="mt-1 block w-full"
          value={form.data.number}
          onChange={e => form.setData('number', e.currentTarget.value)}
        />
        <InputError message={form.errors.number} className="mt-2" />
      </div>
    </FormSection>
  );
}
