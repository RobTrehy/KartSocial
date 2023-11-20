import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import CreateTrackVisitForm from './Partials/CreateTrackVisitForm';

export default function New(props: any) {
  return (
    <AppLayout
      title="New - Track Log"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Record New Track Visit
        </h2>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div>
            <CreateTrackVisitForm {...props} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
