import useTypedPage from '@/Hooks/useTypedPage';
import { Notification } from '@/types';
import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import NotificationItem from './NotificationItem';
import NotificationsNavIcon from './NotificationsNavIcon';

export default function Notifications() {
    const page = useTypedPage();

    if (!page.props.auth.user) {
        return null;
    }

    const [notifications, setNotifications] = useState<Array<Notification>>(page.props.auth.user.notifications);
    const [unreadCount, setUnReadCount] = useState<number>(page.props.auth.user.unread_notifications);

    window.Echo.private(`App.Models.User.${page.props.auth.user.id}`)
        .notification((notification: Notification | any) => {
            if (notification.type === 'user-notification') {
                setNotifications([notification, ...notifications]);
                setUnReadCount(unreadCount + 1)
            } else if (notification.type === 'user-notifications-updated') {
                setNotifications(notification.notifications);
                setUnReadCount(notification.unread_notifications);
            }
        });

    return (
        <Dropdown
            align="right"
            width="72"
            renderTrigger={() => (
                <NotificationsNavIcon unread={unreadCount} />
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