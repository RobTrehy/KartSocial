import Against from '@/Components/Activity/Against';
import Pagination from '@/Components/Pagination/Pagination';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import moment from 'moment';
import React, { useState } from 'react';

export default function Show({ user }: any) {
  const route = useRoute();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AppLayout
      title="User Activity - Admin"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {user.alias} - User Acitvity
          </h2>
          <div className="flex gap-x-2">
            <SecondaryButton
              onClick={() =>
                router.visit(route('admin:users.show', { user: user.id }))
              }
            >
              User Profile
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
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="overflow-hidden md:rounded-md">
            <ul
              role="list"
              className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 border-x border-gray-200 dark:border-gray-700 rounded-t-md"
            >
              <li>
                <div className="grid grid-cols-3 items-center gap-x-6 p-2 bg-gray-200 dark:bg-gray-700 rounded-t-md">
                  <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Date
                  </p>
                  <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Action
                  </p>
                  <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Against
                  </p>
                </div>
              </li>
              {user.actions.data.map((action: any) => (
                <li key={action.id}>
                  <div className="grid grid-cols-3 items-center gap-x-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-900">
                    <p className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                      {moment(action.created_at).format(
                        'DD/MM/YYYY [at] HH:mm:ss',
                      )}{' '}
                      - {moment(action.created_at).fromNow()}
                    </p>
                    <div
                      onClick={() =>
                        setOpen(open === action.id ? null : action.id)
                      }
                      className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white cursor-pointer"
                    >
                      <div className="flex flex-row gap-x-2 items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                        <span>
                          {action.log_name}&nbsp;
                          {action.event === 'updated' && (
                            <>
                              -{' '}
                              {action.properties.attributes
                                ? Object.keys(action.properties.attributes)
                                  .length
                                : 'unknown'}
                              &nbsp;properties&nbsp;
                            </>
                          )}
                          {action.event}
                        </span>
                      </div>
                      {open === action.id &&
                        (action.properties.attributes ||
                          action.properties.old) && (
                          <>
                            <div className="mt-1 grid grid-cols-3 items-center bg-gray-200 dark:bg-gray-700 rounded-t-md">
                              <p className="px-2 text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                                Property
                              </p>
                              <p className="px-2 text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                                Old Value
                              </p>
                              <p className="px-2 text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                                New Value
                              </p>
                            </div>
                            <ul
                              role="list"
                              className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 border-x border-b border-gray-200 dark:border-gray-700 rounded-b-md"
                            >
                              {Object.keys(
                                action.properties.attributes ||
                                action.properties.old,
                              ).map((att: any) => (
                                <li key={att}>
                                  <div className="grid grid-cols-3 items-center">
                                    <p className="px-2 text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white truncate">
                                      {att}
                                    </p>
                                    <p className="px-2 text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white truncate">
                                      {action.properties.old
                                        ? action.properties.old[att]
                                        : ''}
                                    </p>
                                    <p className="px-2 text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white truncate">
                                      {action.properties.attributes
                                        ? action.properties.attributes[att]
                                        : ''}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                    </div>
                    <Against
                      objectType={action.object_type}
                      object={action.object}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-b-md border-t border-gray-200 dark:border-gray-700">
              <Pagination data={user.actions} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
