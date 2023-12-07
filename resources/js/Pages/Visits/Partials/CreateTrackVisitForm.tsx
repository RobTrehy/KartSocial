import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputHelp from '@/Components/Forms/InputHelp';
import InputLabel from '@/Components/Forms/InputLabel';
import SearchSelect from '@/Components/Forms/SearchSelect';
// import Select from '@/Components/Forms/Select';
import TextInput from '@/Components/Forms/TextInput';
import TextareaInput from '@/Components/Forms/TextareaInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { TrackLayout } from '@/types';
import { Link, useForm } from '@inertiajs/react';
// import axios from 'axios';
import classNames from 'classnames';
// import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface track {
  id: number;
  value: number;
  all_layouts: Array<TrackLayout>;
};
interface Props {
  tracks: Array<track>;
  trackSelect: Array<object>;
};

export default function CreateTrackVisitForm(props: Props) {
  const route = useRoute();

  const form = useForm({
    _method: 'POST',
    visit_date: '',
    track_layout_id: '',
    title: '',
    notes: '',
    // linked_visit_id: '0',
  });

  const [track, set_track] = useState<track | null>(null);
  const [layout, set_layout] = useState<object | null>(null);
  const [layouts, setLayouts] = useState<Array<object>>([]);
  // const [suggestions, setSuggestions] = useState<Array<TrackVisit>>([]);

  useEffect(() => {
    if (
      track &&
      props.tracks.filter(obj => {
        return obj.id === track.value;
      })[0].all_layouts.length === 1
    ) {
      let l = props.tracks.filter(obj => {
        return obj.id === track.value;
      })[0].all_layouts[0];
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
      set_layout(null);
      setLayouts(_layouts);
    }
    // matchVisit();
  }, [track]);

  // const matchVisit = async () => {
  //   if (form.data.visit_date !== '' && track) {
  //     await axios.post(`/api/match/${track.value}`, { visit_date: moment(form.data.visit_date).format('Y-M-D HH:mm') })
  //       .then(json => {
  //         setSuggestions(json.data.suggestions)
  //       });
  //   }
  // }

  function createTrackVisit() {
    form.post(route('visits.store'), {
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
      <div className="col-span-6 md:col-span-4">
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
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="track_id" value="Select the Track" />
        <SearchSelect
          value={track}
          onChange={option => set_track(option)}
          options={props.trackSelect}
          isSearchable
        />
        <InputHelp className="mt-1">
          Track Missing?{' '}
          <Link
            href={route('tracks.create')}
            className="hover:text-brand-500 duration-500 transition-colors"
          >
            Submit a new track!
          </Link>
        </InputHelp>
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

      {/* {
        suggestions.length > 0 && (
          <div className="col-span-6 md:col-span-4">
            <InputLabel htmlFor="linked_visit_id" value="We found some possible matches!" />
            <Select
              id="linked_visit_id"
              className="mt-1 block w-full"
              value={form.data.linked_visit_id}
              onChange={e => form.setData('linked_visit_id', e.currentTarget.value)}
            >
              <option value="0">Don't link this visit</option>
              {
                suggestions.map((suggestion: any, i: number) => (
                  <option key={i} value={suggestion.id}>
                    {suggestion.title} by {suggestion.driver.alias}
                  </option>
                ))
              }
            </Select>
            <InputHelp className="mt-2">
              If you went to the same event as these suggestions, you can link your visit to easily compare!
            </InputHelp>
          </div>
        )
      } */}

      {/* <!-- Title --> */}
      <div className="col-span-6 md:col-span-4">
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
      <div className="col-span-6 md:col-span-4">
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
