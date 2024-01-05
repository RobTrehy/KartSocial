import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import EditTrackForm from './Partials/EditTrackForm';

export default function Edit(props: any) {
  return (
    <AppLayout title="Update Track">
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div>
            <EditTrackForm {...props} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
