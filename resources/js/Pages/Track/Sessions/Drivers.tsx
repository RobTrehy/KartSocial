import AppLayout from '@/Layouts/AppLayout';
import { TrackEvent, TrackSession } from '@/types';
import moment from 'moment';
import React from 'react';
import ManageSessionDriversForm from './Partials/ManageSessionDriversForm';

interface Props {
  event: TrackEvent;
  session: TrackSession;
}

export default function Drivers({ event, session }: Props) {
  return (
    <AppLayout
      title="Manage Drivers"
      renderHeader={() => (
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {session.name}
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
          <ManageSessionDriversForm
            event={event}
            session={session}
          />
        </div>
      </div>
    </AppLayout>
  );
}
