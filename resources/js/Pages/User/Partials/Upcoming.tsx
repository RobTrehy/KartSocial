import moment from 'moment';
import React from 'react';

export default function Upcoming({ user }: any) {
    let upCount = 0;

    return (
        <ul className="flex flex-col text-gray-800 dark:text-white">
            <li className="items-center gap-x-2 py-3 px-4 text-center font-semibold bg-white border -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
                Upcoming Track Visits
            </li>
            {
                user.track_visits.map((visit: any, i: number) => {
                    if (moment().diff(moment(visit.visit_date)) < 0) {
                        upCount++;
                        return (
                            <li key={i} className="items-center gap-x-2 py-3 px-4 bg-white border -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md dark:bg-gray-800 dark:border-gray-700 ">
                                <span className="font-semibold">{visit.title}</span> {moment(visit.visit_date).fromNow()} at {visit.track_layout.track.name}<br />
                                <span className="text-sm text-gray-500 dark:text-gray-400">{moment(visit.visit_date).format('DD/MM/YYYY HH:mm')}</span>
                            </li>
                        )
                    }
                })
            }
            {
                upCount === 0 && (
                    <li className="items-center gap-x-2 py-3 px-4 text-sm bg-white border -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
                        Nothing Recorded!
                    </li>
                )
            }
        </ul>
    )
}