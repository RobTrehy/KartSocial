import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import SearchSelect from '@/Components/Forms/SearchSelect';
import TextInput from '@/Components/Forms/TextInput';
import TextareaInput from '@/Components/Forms/TextareaInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { TrackLayout } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface track {
  id: number;
  value: number;
  all_layouts: Array<TrackLayout>;
};
interface Props {
  tracks: Array<track>;
  trackSelect: Array<object>;
  selectedTrack: track;
  selectedLayout: object;
  visit: any; // TODO: TrackVisit Type
};

export default function EditTrackVisitForm(props: Props) {
  const { visit } = props;
  const route = useRoute();

  const form = useForm({
    _method: 'PUT',
    visit_date: visit.visit_date,
    track_layout_id: visit.track_layout_id,
    title: visit.title,
    notes: visit.notes || '',
  });

  const [track, set_track] = useState<track | null>(props.selectedTrack);
  const [layout, set_layout] = useState<object | null>(props.selectedLayout);
  const [layouts, setLayouts] = useState<Array<object>>([]);

  useEffect(() => {
    if (
      track &&
      props.tracks.filter(obj => {
        return obj.id === track.value;
      })[0].all_layouts.length === 1
    ) {
      let l = props.tracks.filter(obj => {
        return obj.id === track?.value;
      })[0]?.all_layouts[0];
      let _layouts: Array<{ value: number, label: string }> = [
        {
          value: l.id,
          label: l.retired_at
            ? `${l.name ? l.name : 'Default'} [Retired]`
            : l.name
              ? l.name
              : 'Default',
        },
      ];
      form.setData('track_layout_id', _layouts[0].value.toString());
      set_layout(_layouts[0]);
      setLayouts(_layouts);
    } else {
      let _layouts: Array<object> = [];
      props.tracks
        .filter(obj => {
          return obj.id === track?.value;
        })[0]?.all_layouts.map((layout: TrackLayout) => {
          _layouts.push({
            value: layout.id,
            label: layout.retired_at
              ? `${layout.name ? layout.name : 'Default'} [Retired]`
              : layout.name
                ? layout.name
                : 'Default',
          });
        });
      form.setData('track_layout_id', '');
      set_layout(null);
      setLayouts(_layouts);
    }
  }, [track]);

  function createTrackVisit() {
    form.put(route('visits.update', { visit: visit.id }), {
      errorBag: 'trackVisit',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTrackVisit}
      title={'Track Visit'}
      description={`Create a new track visit record. This can be a future or past visit.`}
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
      {/* <!-- Date and Time --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="visit_date" value="Date and Time" />
        <TextInput
          id="visit_date"
          type="datetime-local"
          className="mt-1 block w-full"
          value={form.data.visit_date}
          onChange={e => form.setData('visit_date', e.target.value)}
        />
        <InputError message={form.errors.visit_date} className="mt-2" />
      </div>

      {/* <!-- Track ID --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="track_id" value="Select the Track" />
        <SearchSelect
          value={track}
          onChange={option => set_track(option)}
          options={props.trackSelect}
          isSearchable
        />
      </div>

      {/* <!-- Track Layout ID --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="track_layout_id" value="Select the Track Layout" />
        <SearchSelect
          value={layout}
          onChange={option => {
            set_layout(option);
            form.setData('track_layout_id', option?.value);
          }}
          options={layouts}
          isSearchable
        />

        <InputError message={form.errors.track_layout_id} className="mt-2" />
      </div>

      {/* <!-- Title --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="title" value="Visit Title" />
        <TextInput
          id="title"
          type="text"
          className="mt-1 block w-full"
          value={form.data.title}
          onChange={e => form.setData('title', e.currentTarget.value)}
        />
        <InputError message={form.errors.title} className="mt-2" />
      </div>

      {/* <!-- Notes --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="notes" value="Visit Notes" />
        <TextareaInput
          id="notes"
          className="mt-1 block w-full"
          value={form.data.notes}
          onChange={e => form.setData('notes', e.currentTarget.value)}
        />
        <InputError message={form.errors.notes} className="mt-2" />
      </div>
    </FormSection>
  );
}
