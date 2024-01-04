import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import { TrackEvent } from '@/types';
import React from 'react';
import DeleteEventForm from './Partials/DeleteEventForm';
import EditTrackEventForm from './Partials/EditTrackEventForm';

interface Props {
  event: TrackEvent;
}

export default function Edit(props: Props) {
  return (
    <AppLayout
      title="Edit Track Event"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit a Track Event
        </h2>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <EditTrackEventForm {...props} />

          <SectionBorder />

          <div className="mt-10 md:mt-0">
            <DeleteEventForm id={props.event.id} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
