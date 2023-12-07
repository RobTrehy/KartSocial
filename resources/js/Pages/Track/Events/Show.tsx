import SessionAccordion from '@/Components/Accordions/SessionAccordion';
import Card from '@/Components/Cards/Card';
import CardBody from '@/Components/Cards/CardBody';
import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Auth, Driver, TrackEvent, TrackSession } from '@/types';
import { Link, router } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

interface Props {
  event: TrackEvent;
  auth: Auth;
  attendee: boolean;
}

export default function Show({ event, auth, attendee }: Props) {
  const route = useRoute();

  return (
    <AppLayout
      title="Track Event"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Track Event
          </h2>
          <div className="flex gap-x-2">
            {
              attendee && (
                <PrimaryButton
                  onClick={() =>
                    router.visit(route('events.laps', { event: event.id }))
                  }
                >
                  Manage My Laps
                </PrimaryButton>
              )
            }
            {event?.user_id === auth.user?.id && (
              <>
                <SecondaryButton
                  onClick={() =>
                    router.visit(route('events.edit', { event: event.id }))
                  }
                >
                  Edit Event
                </SecondaryButton>
                <SecondaryButton
                  onClick={() =>
                    router.visit(
                      route('events.sessions.create', { event: event.id }),
                    )
                  }
                >
                  Add Session
                </SecondaryButton>
              </>
            )}
          </div>
        </div>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
            <div className="w-full flex flex-col">
              <Card>
                <CardTitle>
                  {event.name} at&nbsp;
                  <Link
                    href={route('tracks.show', { track: event.track_layout.track?.id })}
                    className="hover:text-brand-600 dark:hover:text-brand-500"
                  >
                    {event.track_layout.track?.name}{' '}
                    {event.track_layout.name ? `- ${event.track_layout.name}` : ''}
                  </Link>
                </CardTitle>
                <CardSubtitle>
                  {moment(event.date).format('dddd Do MMMM YYYY [at] HH:mm')}
                </CardSubtitle>
                <CardBody>
                  {event.description && <div className="mb-2">{event.description}</div>}
                  {event.sessions.length !== 0 && (
                    <SessionAccordion event={event} profile={!(event.user_id === auth.user?.id)} />
                  )}
                </CardBody>
              </Card>
            </div>
            <div className="w-full md:w-96 px-0 flex flex-col gap-y-4">
              <ul className="flex flex-col text-gray-800 dark:text-white">
                <li className="items-center gap-x-2 py-3 px-4 text-center font-semibold bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
                  Results
                </li>
                {
                  (event.sessions.length > 0) && event.sessions.map((session: TrackSession, i: number) => (
                    <li
                      key={i}
                      className="items-center gap-x-2 py-3 px-4 bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700 "
                    >
                      <p className="font-semibold">{session.name}</p>
                      <div className="flex flex-col gap-y-1 text-sm">
                        <p>1st: {session.drivers.filter((driver: Driver) => driver.pivot.position === 1)[0]?.alias}</p>
                        <p>2nd: {session.drivers.filter((driver: Driver) => driver.pivot.position === 2)[0]?.alias}</p>
                        <p>3rd: {session.drivers.filter((driver: Driver) => driver.pivot.position === 3)[0]?.alias}</p>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="w-full text-center px-4 text-gray-600 text-xs">
                Something not right with this event? <Link href={route('terms.show')} className="hover:text-brand-600">Report it!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
