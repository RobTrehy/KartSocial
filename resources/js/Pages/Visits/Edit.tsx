import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import DeleteVisitForm from './Partials/DeleteVisitForm';
import EditTrackVisitForm from './Partials/EditTrackVisitForm';

export default function Edit(props: any) {
  return (
    <AppLayout
      title="Edit - Track Log"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit a Track Visit
        </h2>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <EditTrackVisitForm {...props} />

          <SectionBorder />

          <div className="mt-10 sm:mt-0">
            <DeleteVisitForm id={props.visit.id} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
