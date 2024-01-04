import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import SearchSelect from '@/Components/Forms/SearchSelect';
import TextInput from '@/Components/Forms/TextInput';
import TextareaInput from '@/Components/Forms/TextareaInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { TrackEvent, TrackLayout } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface track {
  id: number;
  value: number;
  all_layouts: Array<TrackLayout>;
};
interface EditTrackEventProps {
  tracks: Array<track>;
  trackSelect: Array<object>;
  selectedTrack: track;
  selectedLayout: object;
  event: TrackEvent;
};

export default function EditTrackEventForm(props: EditTrackEventProps) {
  const { event } = props;
  const route = useRoute();

  const form = useForm({
    _method: 'PUT',
    track_layout_id: event.track_layout_id,
    date: event.date,
    name: event.name,
    description: event.description || '',
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
      set_layout(_layouts[0]);
      form.setData('track_layout_id', _layouts[0].value);
      setLayouts(_layouts);
    } else {
      let _layout = 0;
      let _layouts: Array<object> = [];
      props.tracks
        .filter(obj => {
          return obj.id === track?.value;
        })[0]?.all_layouts.map((layout: TrackLayout, i: number) => {
          if (layout.id === form.data.track_layout_id) {
            _layout = i;
          }
          _layouts.push({
            value: layout.id,
            label: layout.retired_at
              ? `${layout.name ? layout.name : 'Default'} [Retired]`
              : layout.name
                ? layout.name
                : 'Default',
          });
        });
      set_layout(_layouts[_layout]);
      setLayouts(_layouts);
    }
  }, [track]);

  function createTrackEvent() {
    form.put(route('events.update', { track: event.track_layout.track.slug, event: event.slug }), {
      errorBag: 'TrackEvent',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTrackEvent}
      title={'Track Event'}
      description={`Make changes to the event!`}
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
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="visit_date" value="Date and Time" />
        <TextInput
          id="visit_date"
          type="datetime-local"
          className="mt-1 block w-full"
          value={form.data.date}
          onChange={e => form.setData('date', e.target.value)}
        />
        <InputError message={form.errors.date} className="mt-2" />
      </div>

      {/* <!-- Track ID --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="track_id" value="Select the Track" />
        <SearchSelect
          value={track}
          onChange={option => set_track(option)}
          options={props.trackSelect}
          isSearchable
        />
      </div>

      {/* <!-- Track Layout ID --> */}
      <div className="col-span-6 md:col-span-4">
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

      {/* <!-- Name --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="name" value="Name of Event" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Description --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="description" value="Description" />
        <TextareaInput
          id="description"
          className="mt-1 block w-full"
          value={form.data.description}
          onChange={e => form.setData('description', e.currentTarget.value)}
        />
        <InputError message={form.errors.description} className="mt-2" />
      </div>
    </FormSection>
  );
}
