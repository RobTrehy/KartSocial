import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import CreateTrackSessionForm from './Partials/CreateTrackSessionForm';

export default function NewSession({ visit, ...props }: any) {
    return (
        <AppLayout
            title="Add Session"
            renderHeader={() => (
                <div className="flex flex-col">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Add New Session
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-700">
                        {visit.track_layout.track.name} {visit.track_layout.name} on {visit.visit_date}
                    </p>
                </div>
            )}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <CreateTrackSessionForm track_visit_id={visit.id} order={visit.sessions.length} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
