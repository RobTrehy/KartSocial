import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import EditTrackLayoutForm from './Partials/EditTrackLayoutForm';

export default function Edit(props: any) {
    return (
        <AppLayout
            title="Update Track Layout"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Update Track Layout
                </h2>
            )}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <EditTrackLayoutForm {...props} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
