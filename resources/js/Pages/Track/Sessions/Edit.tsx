import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import { TrackEvent, TrackSession } from '@/types';
import moment from 'moment';
import React from 'react';
import DeleteSessionForm from './Partials/DeleteSessionForm';
import EditTrackSessionForm from './Partials/EditTrackSessionForm';

interface Props {
  event: TrackEvent;
  session: TrackSession;
}

export default function Edit({ event, session }: Props) {
  return (
    <AppLayout
      title="Edit Session"
      renderHeader={() => (
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Session
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-700">
            {event.name} at {event.track_layout.track.name} {event.track_layout.name} on{' '}
            {moment(event.date).format('dddd Do MMMM YYYY [at] HH:mm')}
          </p>
        </div>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <EditTrackSessionForm
            track_event_id={event.id}
            order={session.order}
            session={session}
          />

          <SectionBorder />

          <div className="mt-10 md:mt-0">
            <DeleteSessionForm event={event.id} session={session.id} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
