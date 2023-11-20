import Pagination from '@/Components/Pagination/Pagination';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Index({ users }: any) {
  const route = useRoute();

  return (
    <AppLayout
      title="Users - Admin"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Users
        </h2>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <ul
              role="list"
              className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 border-x border-gray-200 dark:border-gray-700 rounded-t-md"
            >
              <li>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-x-6 p-2 bg-gray-200 dark:bg-gray-700 rounded-t-md">
                  <p className="col-span-2 pl-14 text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Name
                  </p>
                  <p className="hidden sm:block text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Alias
                  </p>
                  <p className="hidden md:block text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Weight
                  </p>
                  <p className="hidden md:block text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                    Home Track
                  </p>
                </div>
              </li>
              {users.data.map((person: any) => (
                <li key={person.email}>
                  <Link
                    href={route('admin:users.show', { user: person.id })}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-x-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <div className="col-span-2 flex min-w-0 gap-x-4">
                      <img
                        className="h-10 w-10 flex-none rounded-md object-cover"
                        src={person.profile_photo_url}
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                          {person.name}
                        </p>
                        <p className="truncate text-sm leading-5 text-gray-500 dark:text-gray-400">
                          {person.email}
                          {person.email_verified_at && (
                            <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900 ml-2 px-1 py-0.5 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                              Verified
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="hidden sm:block text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                      {person.alias}
                    </p>
                    <p className="hidden md:block text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                      {person.weight}
                      {person.weight ? ' KG' : ''}
                    </p>
                    <p className="hidden md:block text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                      {person.home_track?.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-b-md border-t border-gray-200 dark:border-gray-700">
              <Pagination data={users} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
