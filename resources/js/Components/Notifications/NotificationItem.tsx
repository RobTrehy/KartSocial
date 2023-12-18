import { Notification } from '@/types';
import { router } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import moment from 'moment';
import React, { PropsWithChildren } from 'react';
import route from 'ziggy-js';

interface Props {
    notification: Notification;
}

export default function NotificationItem({ notification }: PropsWithChildren<Props>) {
    const classes = classNames(
        !notification.read_at ? 'bg-gray-50 dark:bg-gray-800' : '',
        'block',
        'w-full',
        'px-4',
        'py-2',
        'text-left',
        'text-sm',
        'leading-5',
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out',
        'border-b border-gray-100 dark:border-gray-900',
        'cursor-pointer',
    );

    const markAsRead = async (notification: Notification) => {
        if (!notification.read_at) {
            notification.read_at = moment().format('Y-M-D H:m:s');
            await axios.put(
                route('notifications.read.mark', { 'notification': notification.id }),
                { 'read_at': notification.read_at }
            )
                .then(() => {
                    if (notification.data.url) {
                        router.visit(notification.data.url);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else if (notification.data.url) {
            router.visit(notification.data.url);
        }
    }

    return (
        <div
            onClick={() => markAsRead(notification)}
            className={classes}
        >
            <p className="font-semibold">{notification.data.title}</p>
            <p>{notification.data.message}</p>
        </div>
    )
}