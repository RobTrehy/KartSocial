import FeedHeader from '@/Components/Feed/Cards/Partials/FeedHeader';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';
import AdminAppeals from './Partials/AdminAppeals';

export default function Restriction({ user }: any) {
  const route = useRoute();

  return (
    <AppLayout
      title="User Restriction - Admin"
      renderHeader={() => (
        <div className="flex flex-row items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {user.alias} - User Restriction
          </h2>
          <div className="ml-auto flex gap-x-2">
            <SecondaryButton
              onClick={() =>
                router.visit(route('admin:users.show', { user: user.id }))
              }
            >
              User Profile
            </SecondaryButton>
            <SecondaryButton
              onClick={() =>
                router.visit(route('admin:users.activity', { user: user.id }))
              }
            >
              User Activity
            </SecondaryButton>
            <SecondaryButton
              onClick={() =>
                router.visit(
                  route('admin:users.track-visits', { user: user.id }),
                )
              }
            >
              Track Visits
            </SecondaryButton>
          </div>
        </div>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-2">
          <p>
            The account was restricted by {user.ban.banner.alias} on{' '}
            {moment(user.ban.created_at).format('Do MMMM YYYY [at] HH:mm')}
          </p>
          {user.ban.expires_at ? (
            <p>
              The restriction expires on:{' '}
              {moment(user.ban.expires_at).format('Do MMMM YYYY')}
            </p>
          ) : (
            <p>The restriction has been made permenantly.</p>
          )}

          <div>
            <div className="flex flex-col text-gray-800 dark:text-white bg-white border-t border-x rounded-t-lg px-4 md:px-5 pt-4 md:pt-5 dark:bg-gray-800 dark:border-gray-700 w-full">
              <FeedHeader
                user={user.ban.banner}
                description={<>provided the following reason</>}
                time={user.ban.updated_at}
              />
              <div className="mb-4">{user.ban.reason}</div>
            </div>
            {user.ban.appeals.length > 0 && <AdminAppeals ban={user.ban} />}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
