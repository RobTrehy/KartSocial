import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import InviteUserForm from './Partials/InviteUserForm';

interface Props {
  invited: Array<any>;
}

export default function Show({ invited }: Props) {
  return (
    <AppLayout
      title={'Private Alpha Invitation'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Invite to Alpha
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <InviteUserForm invited={invited} />
        </div>
      </div>
    </AppLayout>
  );
}
