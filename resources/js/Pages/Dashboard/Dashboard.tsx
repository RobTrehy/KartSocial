import DashboardFeed from '@/Components/Feed/DashboardFeed';
import MessageReveal from '@/Components/MessageReveal/MessageReveal';
import Welcome from '@/Components/Welcome';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
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
                {suggestions.length > 0 && (
                  <>
                    <div className="flex flex-col items-center bg-white border -mt-px rounded-md overflow-hidden dark:text-white dark:bg-gray-800 dark:border-gray-700 divide-y dark:divide-gray-700">
                      <div className="flex flex-row w-full justify-between items-center py-3 px-4">
                        <div className="flex flex-col">
                          <p className="text-md font-semibold">
                            People you may know
                          </p>
                        </div>
                        <div className="text-sm font-normal text-brand-500 hover:text-brand-800">
                          See All
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        {suggestions.map((suggestion: any, i: number) => (
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
                        ))}
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
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
