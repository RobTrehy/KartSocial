import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import DeleteSessionForm from './Partials/DeleteSessionForm';
import EditTrackSessionForm from './Partials/EditTrackSessionForm';

export default function EditSession({ visit, session, ...props }: any) {
    return (
        <AppLayout
            title="Edit Session"
            renderHeader={() => (
                <div className="flex flex-col">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Session
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-700">
                        {visit.track_layout.track.name} {visit.track_layout.name} on {visit.visit_date}
                    </p>
                </div>
            )}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <EditTrackSessionForm track_visit_id={visit.id} order={visit.sessions.length} session={session} />

                    <SectionBorder />

                    <div className="mt-10 sm:mt-0">
                        <DeleteSessionForm visit={visit.id} session={session.id} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
