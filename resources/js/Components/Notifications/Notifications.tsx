import useTypedPage from '@/Hooks/useTypedPage';
import { Notification } from '@/types';
import React from 'react';
import Dropdown from '../Dropdown';
import NotificationItem from './NotificationItem';
import NotificationsNavIcon from './NotificationsNavIcon';

export default function Notifications() {
    const page = useTypedPage();

    if (!page.props.auth.user) {
        return null;
    }

    const { notifications } = page.props.auth.user;

    return (
        <Dropdown
            align="right"
            width="72"
            renderTrigger={() => (
                <NotificationsNavIcon />
            )}
        >
            {
                notifications.map((notification: Notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))
            }
            <div className="block px-4 py-2 text-xs text-center text-brand-600 hover:text-brand-500">
                {
                    notifications.length > 5
                        ? (<>View All {notifications.length} Notifications</>)
                        : (<>View All Notifications</>)
                }
            </div>
        </Dropdown>
    )
}