import DashboardFeed from '@/Components/Feed/DashboardFeed';
import MessageReveal from '@/Components/MessageReveal/MessageReveal';
import Welcome from '@/Components/Welcome';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

export default function Dashboard({ feed, suggestions, tracks }: any) {
  const page = useTypedPage();
  const route = useRoute();

  return (
    <AppLayout title="Dashboard">
      <div className="py-6">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8 flex flex-row gap-x-6">
          {feed.length === 0 ? (
            <Welcome />
          ) : (
            <>
              <div className="flex flex-col gap-y-6 mb-6 md:w-2/3">
                {feed.length > 0 &&
                  page.props.app_feedback_label === 'alpha' && (
                    <MessageReveal
                      title="Kart Social is currently in a Private Alpha release state!"
                      message={
                        <>
                          <p>
                            You may find functionality that doesn't quite work
                            as expected. Please use the feedback dropdown menu
                            on the top navigation bar to report any issues you
                            may find.
                          </p>
                          <p>
                            You will also find options to submit feature
                            requests and view our changelog under this same
                            menu.
                          </p>
                          <p className="mt-2">
                            Our main focus at this time is making sure
                            everything works correctly. This means most, if not
                            all, of the design is likely to change later on!
                          </p>
                          <p className="mt-2">
                            If you're familiar with PHP, Laravel, InertiaJS or
                            React, head on over to{' '}
                            <a
                              rel="noopener"
                              href="https://github.com/RobTrehy/KartSocial"
                              target="_blank"
                              className="text-brand-500 hover:underline"
                            >
                              GitHub
                            </a>{' '}
                            to see if you can help out!?
                          </p>
                        </>
                      }
                    />
                  )}
                <DashboardFeed feed={feed} />
              </div>
              <div className="hidden md:flex flex-col gap-y-6 w-1/3">
                <div className="flex flex-col items-center bg-white border -mt-px rounded-md overflow-hidden dark:text-white dark:bg-gray-800 dark:border-gray-700 divide-y dark:divide-gray-700">
                  <div className="flex flex-row w-full justify-between items-center py-3 px-4">
                    <div className="flex flex-col">
                      <p className="text-md font-semibold">
                        People you may know
                      </p>
                    </div>
                    {/* <div className="text-sm font-normal text-brand-500 hover:text-brand-800">
                      See All
                    </div> */}
                  </div>
                  <div className="flex flex-col w-full">
                    {suggestions.length > 0
                      ? suggestions.map((suggestion: any, i: number) => (
                        <Link
                          href={route('profile.show', {
                            alias: suggestion.suggested.alias,
                          })}
                          key={i}
                          className="flex flex-row gap-y-1 gap-x-4 items-center group hover:bg-gray-50 dark:hover:bg-gray-900 py-2 px-4"
                        >
                          <img
                            src={suggestion.suggested.profile_photo_url}
                            className="rounded-md w-12 h-12 mx-auto object-cover"
                            alt={suggestion.suggested.alias}
                          />
                          <div className="flex flex-col w-full">
                            <p className="text-sm font-semibold group-hover:text-brand-500">
                              {suggestion.suggested.alias}
                            </p>
                            {suggestion.via_type === 'App\\Models\\User' ? (
                              <div className="text-sm text-gray-500">
                                You both follow {suggestion.via.alias}
                              </div>
                            ) : null}
                            {suggestion.via_type === 'App\\Models\\Track' ? (
                              <div className="text-sm text-gray-500">
                                You both visit {suggestion.via.name}
                              </div>
                            ) : null}
                          </div>
                        </Link>
                      ))
                      :
                      <div className="flex flex-col w-full gap-y-2 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                        <p className="text-center font-bold">It's us, not you!</p>
                        <p className="text-sm">This is embarrasing, but we probably don't know enough about you or other people to be able to make suggestions just yet. Please check back again shortly!</p>
                      </div>
                    }
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white border -mt-px rounded-md overflow-hidden dark:text-white dark:bg-gray-800 dark:border-gray-700 divide-y dark:divide-gray-700">
                  <div className="flex flex-row w-full justify-between items-center py-3 px-4">
                    <div className="flex flex-col">
                      <p className="text-md font-semibold">
                        Tracks you've not yet visited
                      </p>
                    </div>
                    <Link
                      href={route('tracks.index')}
                      className="text-sm font-normal text-brand-500 hover:text-brand-800"
                    >
                      See All
                    </Link>
                  </div>
                  <div className="flex flex-col w-full">
                    {tracks.map((track: any, i: number) => (
                      <Link
                        href={route('tracks.show', { track: track.id })}
                        key={i}
                        className="flex flex-row gap-y-1 gap-x-4 items-center group hover:bg-gray-50 dark:hover:bg-gray-900 py-1 px-4"
                      >
                        <div className="flex flex-col w-full">
                          <p className="text-sm font-semibold group-hover:text-brand-500">
                            {track.name}
                          </p>
                          <div className="text-sm text-gray-500">
                            {track.town}
                            {track.postal_code
                              ? `, ${track.postal_code}`
                              : null}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap px-4 gap-2 text-gray-600 text-xs">
                  <Link href={route('terms.show')} className="hover:text-brand-600">Terms of Service</Link>
                  <Link href={route('policy.show')} className="hover:text-brand-600">Privacy Policy</Link>
                  <Link href="#" className="hover:text-brand-600 ml-auto">Help & Support</Link>
                  <div className="flex flex-row w-full justify-between">
                    <div>&copy; Copyright Kart Social {moment().year()}</div>
                    <div className="text-right">{page.props.app_version}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
