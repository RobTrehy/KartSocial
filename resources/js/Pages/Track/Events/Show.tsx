import SessionAccordion from '@/Components/Accordions/SessionAccordion';
import Card from '@/Components/Cards/Card';
import CardBody from '@/Components/Cards/CardBody';
import CardHeader from '@/Components/Cards/CardHeader';
import CardSubtitle from '@/Components/Cards/CardSubtitle';
import CardTitle from '@/Components/Cards/CardTitle';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ProfilePhoto from '@/Components/UserPhotos/ProfilePhoto';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Auth, Driver, TrackEvent, TrackSession, User } from '@/types';
import { Link, router } from '@inertiajs/react';
import moment from 'moment';
import React, { useState } from 'react';
import AttendanceDropdown from './Partials/AttendanceDropdown';
import MyResultsDialog from './Partials/MyResultsDialog';

interface Props {
  event: TrackEvent;
  auth: Auth;
  driver: boolean;
}

export default function Show({ event, auth, driver }: Props) {
  const route = useRoute();
  const [showingMyResults, setShowingMyResults] = useState<boolean>(false);

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
              (moment().diff(moment(event.date)) > 0 && driver) ?
                <PrimaryButton
                  onClick={() =>
                    router.visit(route('events.laps', { event: event.id }))
                  }
                >
                  Manage My Laps
                </PrimaryButton> :
                <PrimaryButton
                  onClick={() => setShowingMyResults(true)}
                >
                  Add My Results
                </PrimaryButton>
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
                <CardHeader
                  actions={
                    moment().diff(moment(event.date)) < 0 ?
                      <AttendanceDropdown event={event} auth={auth} /> : null
                  }
                >
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
                </CardHeader>
                <CardBody>
                  {event.description && <div className="mb-2">{event.description}</div>}
                  {event.sessions.length !== 0 && (
                    <SessionAccordion event={event} profile={!(event.user_id === auth.user?.id)} />
                  )}
                </CardBody>
              </Card>
            </div>
            <div className="w-full md:w-96 px-0 flex flex-col gap-y-4">
              {
                moment().diff(moment(event.date)) < 0 ? (
                  <ul className="flex flex-col text-gray-800 dark:text-white">
                    <li className="items-center gap-x-2 py-3 px-4 text-center font-semibold bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
                      Attendee List
                    </li>
                    {
                      (event.attendees.length > 0) && event.attendees.map((user: User, i: number) => (
                        <li
                          key={i}
                          className="flex flex-row items-center gap-x-2 py-2 px-4 bg-white border -mt-px md:first:rounded-t-md first:mt-0 md:last:rounded-b-md dark:bg-gray-800 dark:border-gray-700 "
                        >
                          <ProfilePhoto size="xs" user={user} />
                          <div className="flex flex-col">
                            <p className="font-semibold">{user.alias}</p>
                            <p className="italic text-sm">{event.attendees.filter((u: User) => u.id === user.id)[0]?.pivot.status.value}</p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                ) : (
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
                )
              }
              <div className="w-full text-center px-4 text-gray-600 text-xs">
                Something not right with this event? <Link href={route('terms.show')} className="hover:text-brand-600">Report it!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyResultsDialog event={event} show={showingMyResults} change={setShowingMyResults} />
    </AppLayout>
  );
}
