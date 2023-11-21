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

export default function EditTrackLayoutForm({ track, layout }: any) {
  const route = useRoute();

  const form = useForm({
    _method: 'PUT',
    name: layout.name || '',
    is_default: layout.is_default,
    length: layout.length || '',
  });

  function updateTrackLayout() {
    form.put(
      route('tracks.layout.update', { track: track.id, layout: layout.id }),
      {
        errorBag: 'trackLayoutUpdate',
      },
    );
  }

  return (
    <FormSection
      onSubmit={updateTrackLayout}
      title={'Update Track Layout'}
      description={`Found incorrect details? Update them for us!`}
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
      {/* <!-- Layout Name --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="name" value="Layout Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.target.value)}
          autoComplete="false"
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Layout Length --> */}
      <div className="col-span-6 md:col-span-4">
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
