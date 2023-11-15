import AppLayout from '@/Layouts/AppLayout';
import { User } from '@/types';
import React, { PropsWithChildren } from 'react';
import FollowedBy from '../Partials/FollowedBy';
import Header from '../Partials/Header';
import Upcoming from '../Partials/Upcoming';

export interface UserPageLayoutProps {
  user: User;
  following: any; // TODO
}

export default function UserPageLayout({
  user,
  following,
  children,
}: PropsWithChildren<UserPageLayoutProps>) {
  return (
    <AppLayout title={user.alias}>
      <Header user={user} following={following} />

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="overflow-hidden pb-8">
          <div className="flex gap-x-6 ">
            <div className="w-96 flex flex-col gap-y-4">
              <Upcoming user={user} />
              <FollowedBy user={user} />
            </div>
            <div className="w-full flex flex-col gap-y-4">{children}</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
