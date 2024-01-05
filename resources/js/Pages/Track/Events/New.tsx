import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import CreateTrackEventForm from './Partials/CreateTrackEventForm';

export default function New(props: any) {
  return (
    <AppLayout title="New Track Event">
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <CreateTrackEventForm {...props} />
        </div>
      </div>
    </AppLayout>
  );
}
