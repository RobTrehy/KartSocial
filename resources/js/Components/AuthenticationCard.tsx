import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import useTypedPage from '@/Hooks/useTypedPage';
import React, { PropsWithChildren } from 'react';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const page = useTypedPage();
  const { laps, users } = page.props;

  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="w-0 sm:w-1/2 flex flex-col gap-4 sm:justify-center items-center pt-6 sm:pt-0 bg-brand-600 text-white">
        <h1 className="text-5xl font-bold">Kart Social</h1>
        <div className="rounded-lg bg-brand-500 w-3/4 p-5">
          Login or Register to the social platform for go-kart racers to record,
          share and compare their lap times!
          <div className="px-4 py-8 mx-auto text-center lg:py-10 lg:px-6">
            <dl className="grid gap-8 mx-auto text-white sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  100+
                </dt>
                <dd className="font-light text-gray-200">UK Tracks</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {laps}+
                </dt>
                <dd className="font-light text-gray-200">Recorded Laps</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {users}+
                </dt>
                <dd className="font-light text-gray-200">Kart Racers</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 px-8 sm:px-40 bg-white dark:bg-gray-900">
        <div className="sm:hidden">
          <AuthenticationCardLogo />
        </div>

        {children}
      </div>
    </div>
  );
}
