import React from 'react';
import NewNotificationsIcon from './Icons/NewNotificationsIcon';
import NoNotificationsIcon from './Icons/NoNotificationsIcon';

interface Props {
    unread: number;
}

export default function NotificationsNavIcon({ unread }: Props) {
    return (
        unread === 0 ? (
            <NoNotificationsIcon
                className="w-6 h-6 cusror-pointer stroke-gray-600 dark:stroke-gray-400 hover:stroke-black dark:hover:stroke-white hover:fill-brand-600 transition-colors duration-500"
            />
        ) : (
            <NewNotificationsIcon
                className="w-6 h-6 cusror-pointer stroke-gray-600 dark:stroke-gray-400 hover:stroke-black dark:hover:stroke-white fill-red-500 hover:fill-red-600 transition-colors duration-500"
            />
        )
    )
}