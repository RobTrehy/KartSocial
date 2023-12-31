import useTypedPage from '@/Hooks/useTypedPage';
import React, { PropsWithChildren } from 'react';
import TextLogo from './Logos/TextLogo';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const page = useTypedPage();
  const { laps, users } = page.props;

  return (
    <div className="md:h-full min-h-screen w-screen flex flex-col-reverse md:flex-row justify-center">
      <div className="min-h-[50vh] md:h-screen md:w-1/2 flex flex-col gap-4 justify-center items-center py-6 mt:p-0 bg-brand-600 text-white">
        <div className="w-2/5 hidden md:flex">
          <TextLogo classes="text-white" secondaryClasses='text-white/70' />
        </div>
        <div className="rounded-md bg-brand-500 md:w-3/4 mx-4 p-5 mb-8">
          Login or Register to the social platform for go-kart racers to record,
          share and compare their lap times!
          <div className="px-4 py-8 mx-auto text-center lg:py-10 lg:px-6">
            <dl className="grid gap-8 mx-auto text-white grid-cols-3">
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

      <div className="min-h-[50vh] md:h-screen md:w-1/2 flex flex-col justify-center items-center py-6 px-8 2xl:px-40 bg-white dark:bg-gray-900">
        <div className="flex md:hidden w-4/5 mb-5 md:mb-0">
          <TextLogo classes="text-brand-600" secondaryClasses="text-brand-500" />
        </div>

        {children}
      </div>
    </div>
  );
}
