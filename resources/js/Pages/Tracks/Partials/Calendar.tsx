import Card from '@/Components/Cards/Card';
import CardTitle from '@/Components/Cards/CardTitle';
import useRoute from '@/Hooks/useRoute';
import { Track } from '@/types';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import { router } from '@inertiajs/react';
import moment, { Moment } from 'moment';
import React, { createRef, useEffect, useState } from 'react';

interface Props {
    track: Track;
}

export default function Calendar(props: Props) {
    const route = useRoute();
    const calendar = createRef();
    const [calendarApi, setCalendarApi] = useState();

    const [date, setDate] = useState<Moment>(moment());
    const [view, setView] = useState<string>('listYear');

    useEffect(() => {
        if (!calendarApi && calendar.current) {
            setCalendarApi(calendar.current.getApi());
        }
    }, [calendar]);

    useEffect(() => {
        if (calendar.current && calendarApi) {
            setDate(moment(calendarApi.getDate().toISOString()));
        }
    }, [calendarApi]);

    useEffect(() => {
        if (calendar.current && calendarApi) {
            calendarApi.changeView(view);
            setDate(moment(calendarApi.getDate().toISOString()));
        }
    }, [view]);

    const prev = () => {
        if (calendar.current && calendarApi) {
            calendarApi.prev();
            setDate(moment(calendarApi.getDate().toISOString()));
        }
    }

    const next = () => {
        if (calendar.current && calendarApi) {
            calendarApi.next();
            setDate(moment(calendarApi.getDate().toISOString()));
        }
    }

    const today = () => {
        if (calendar.current && calendarApi) {
            calendarApi.today();
            setDate(moment(calendarApi.getDate().toISOString()));
        }
    }

    return (
        <Card>
            <CardTitle>
                <div className="flex flex-row items-center mb-2">
                    <p className="w-40">{(view === 'dayGridMonth') ? date.format('MMMM YYYY') : date.format('YYYY')}</p>
                    <div className="flex flex-row">
                        <button
                            type="button"
                            title="Previous"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-2 py-1.5 text-sm rounded-l-md border-r border-brand-600"
                            onClick={prev}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1 text-sm border-r border-brand-600"
                            onClick={today}
                        >
                            Today
                        </button>
                        <button
                            type="button"
                            title="Next"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-2 py-1.5 text-sm rounded-r-md"
                            onClick={next}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1 text-sm ml-4 rounded-md"
                            onClick={() => router.visit(route('events.create'))}
                        >
                            Create Event
                        </button>
                    </div>
                    <div className="flex flex-row ml-auto">
                        <button
                            type="button"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1 text-sm rounded-l-md border-r border-brand-600"
                            onClick={() => setView('listYear')}
                        >
                            List View
                        </button>
                        <button
                            type="button"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1 text-sm border-r border-brand-600"
                            onClick={() => setView('dayGridMonth')}
                        >
                            Month View
                        </button>
                        <button
                            type="button"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1 text-sm rounded-r-md"
                            onClick={() => setView('multiMonthYear')}
                        >
                            Year View
                        </button>
                    </div>
                </div>
            </CardTitle>
            <FullCalendar
                ref={calendar}
                height="auto"
                plugins={[dayGridPlugin, multiMonthPlugin, listPlugin]}
                initialView={view}
                events={{
                    url: `/api/tracks/${props.track.slug}`
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                headerToolbar={false}
                firstDay={1}
                multiMonthMaxColumns={2}
            />
        </Card>
    )
}