import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import CreateTrackForm from './Partials/CreateTrackForm';

export default function New() {
  return (
    <AppLayout
      title="New Track"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Submit New Track
        </h2>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div>
            <CreateTrackForm />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
