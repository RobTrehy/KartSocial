import ActionSection from '@/Components/ActionSection';
import DialogModal from '@/Components/DialogModal';
import SecondaryButton from '@/Components/SecondaryButton';
import { Role, User } from '@/types';
import moment from 'moment';
import React, { useState } from 'react';
import FeaturePacks from './FeaturePacks';

interface Props {
  user: User;
}

export default function AdminPlanForm({ user }: Props) {
  const [addFeatures, setAddFeatures] = useState<boolean>(false);

  return (
    <ActionSection
      title={'User Access'}
      description={`The features this user has signed up for.`}
    >
      <div className="grid grid-cols-6 gap-6">
        <div className="flex flex-col gap-y-2 col-span-6 md:col-span-4">
          {user.roles?.map((role: Role, i: number) => {
            return (
              <div
                className={`flex flex-col ${role.colors.background} border ${role.colors.border} p-2 rounded-md dark:text-gray-200`}
                key={i}
              >
                <p className="font-semibold leading-6">{role.name}</p>
                <p className="text-sm italic">
                  Since: {moment(role.pivot.created_at).format('Do MMMM YYYY')}
                </p>
                <p className="text-sm italic">
                  Expires:{' '}
                  {role.pivot.expires_at
                    ? moment(role.pivot.expires_at).format('Do MMMM YYYY')
                    : 'Never'}
                </p>
                {role.pivot.cost && (
                  <p className="text-sm">
                    Cost: £{Intl.NumberFormat().format(role.pivot.cost)}/year
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 -mx-4 md:-mx-6 -mb-5 md:-mb-6">
        <div className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right md:px-6 md:rounded-bl-md md:rounded-br-md">
          <SecondaryButton
            onClick={() => setAddFeatures(true)}
          >
            Add Feature
          </SecondaryButton>
        </div>
      </div>

      <DialogModal
        isOpen={addFeatures}
        onClose={() => setAddFeatures(false)}
      >
        <DialogModal.Content title="Add Feature Pack to User">
          <FeaturePacks user={user} />
        </DialogModal.Content>
      </DialogModal>
    </ActionSection>
  );
}
