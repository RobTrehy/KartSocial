import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { User } from '@/types';
import { router } from '@inertiajs/react';
import React from 'react';
import AdminPlanForm from './Partials/AdminPlanForm';
import AdminProfileForm from './Partials/AdminProfileForm';
import AdminProfilePhotosForm from './Partials/AdminProfilePhotosForm';
import AdminRestrictionForm from './Partials/AdminRestrictionForm';
import DeleteUserForm from './Partials/DeleteUserForm';

interface Props {
  user: User;
}

export default function Show({ user, ...props }: Props) {
  const page = useTypedPage();
  const route = useRoute();

  return (
    <AppLayout
      title="User - Admin"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Administrate User
          </h2>
          <div className="flex gap-x-2">
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
                  route('admin:users.track-events', { user: user.id }),
                )
              }
            >
              Track Events
            </SecondaryButton>
          </div>
        </div>
      )}
    >
      {user.restriction && (
        <div className="bg-red-700">
          <div className="max-w-screen-xl mx-auto py-2 px-3 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between flex-wrap">
              <div className="flex flex-row items-center">
                <span className="flex flex-row p-2 rounded-md bg-red-600">
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </span>

                <p className="ml-3 font-medium text-sm text-white truncate">
                  This User is currently restricted from using Kart Social!
                </p>
              </div>

              <div className="flex-shrink-0 md:ml-3">
                <SecondaryButton
                  onClick={() =>
                    router.visit(
                      route('admin:users.restriction.manage', {
                        user: user.id,
                      }),
                    )
                  }
                >
                  Manage Restriction
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          {page.props.jetstream.managesProfilePhotos ? (
            <>
              <AdminProfilePhotosForm user={user} />

              <SectionBorder />
            </>
          ) : null}

          <div className="mt-10 md:mt-0">
            <AdminProfileForm user={user} {...props} />
          </div>

          <SectionBorder />

          <div className="mt-10 md:mt-0">
            <AdminPlanForm user={user} />
          </div>

          {!user.restriction && (
            <div className="mt-10 md:mt-0">
              <SectionBorder />
              <AdminRestrictionForm user={user} />
            </div>
          )}

          <div className="mt-10 md:mt-0">
            <SectionBorder />
            <DeleteUserForm user={user} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
