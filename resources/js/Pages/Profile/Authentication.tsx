import Pagination from '@/Components/Pagination/Pagination';
import AppLayout from '@/Layouts/AppLayout';
import moment from 'moment';
import React from 'react';

interface Props {
  authentications: {
    data: Array<Authentication>;
  };
}
interface Authentication {
  id: number;
  ip_address: string;
  agent: {
    browser: string;
    platform: string;
  };
  location_string: string;
  login_at: string;
  login_successful: boolean;
  logout_at: string;
  cleared_by_user: boolean;
}

export default function Authentication({ authentications }: Props) {
  return (
    <AppLayout
      title={'Authentication History'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Authentication History
        </h2>
      )}
    >
      <div className="max-w-7xl mx-auto py-10 md:px-6 lg:px-8">
        <div className="overflow-hidden md:rounded-md">
          <ul
            role="list"
            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 border-x border-gray-200 dark:border-gray-700 rounded-t-md"
          >
            <li>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center gap-x-6 p-2 bg-gray-200 dark:bg-gray-700 rounded-t-md">
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  IP Address
                </p>
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Browser
                </p>
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Location
                </p>
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Login At
                </p>
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Logout At
                </p>
                <p className="text-xs font-medium text-left text-gray-500 dark:text-gray-400 uppercase">
                  Cleared by User
                </p>
              </div>
            </li>
            {authentications.data.map((auth: Authentication) => (
              <li
                key={auth.id}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center gap-x-6 p-2"
              >
                <p className="block text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {auth.ip_address}
                </p>
                <p className="flex flex-col text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {auth.agent.browser}
                  <span>{auth.agent.platform}</span>
                </p>
                <p className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {auth.location_string}
                </p>
                <p className="flex flex-col text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {moment(auth.login_at).calendar({ sameElse: 'LL [at] LT' })}
                  {
                    auth.login_successful
                      ? <span className="text-green-500">Successful</span>
                      : <span className="text-red-500">Failed</span>
                  }
                </p>
                <p className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {auth.logout_at && moment(auth.logout_at).calendar({ sameElse: 'LL [at] LT' })}
                </p>
                <p className="text-sm leading-6 whitespace-nowrap text-gray-900 dark:text-white">
                  {auth.cleared_by_user ? 'Yes' : 'No'}
                </p>
              </li>
            ))}
          </ul>
          <div className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-b-md border-t border-gray-200 dark:border-gray-700">
            <Pagination data={authentications} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
