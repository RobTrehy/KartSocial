import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import EditTrackLayoutForm from './Partials/EditTrackLayoutForm';

export default function Edit(props: any) {
  return (
    <AppLayout title="Update Track Layout">
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div>
            <EditTrackLayoutForm {...props} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
