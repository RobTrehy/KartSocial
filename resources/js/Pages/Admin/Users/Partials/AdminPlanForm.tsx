import ActionSection from '@/Components/ActionSection';
import { User } from '@/types';
import moment from 'moment';
import React from 'react';

interface Props {
  user: User;
}

export default function AdminPlanForm({ user }: Props) {
  return (
    <ActionSection
      title={'User Access'}
      description={`The features this user has signed up for.`}
    >
      <div className="grid grid-cols-6 gap-6">
        <div className="flex flex-col gap-y-2 col-span-6 sm:col-span-4">
          {/* TODO: Role type */}
          {user.roles?.map((role: any, i: number) => {
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
    </ActionSection>
  );
}
