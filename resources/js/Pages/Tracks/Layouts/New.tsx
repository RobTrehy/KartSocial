import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import CreateTrackLayoutForm from './Partials/CreateTrackLayoutForm';

export default function New(props: any) {
  return (
    <AppLayout title="New Layout">
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div>
            <CreateTrackLayoutForm {...props} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
