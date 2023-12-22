import Card from '@/Components/Cards/Card';
import CardBody from '@/Components/Cards/CardBody';
import CardHeader from '@/Components/Cards/CardHeader';
import CardTitle from '@/Components/Cards/CardTitle';
import NotificationItem from '@/Components/Notifications/NotificationItem';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Notification } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';

interface Props {
  notifications: Array<Notification>;
}

export default function Index({ notifications }: any) {
  const route = useRoute();

  return (
    <AppLayout title="Notifications">
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <Card>
            <CardHeader
              actions={(
                <Link
                  href={route('notifications.all.read')}
                  className="text-sm text-brand-600 hover:text-brand-500 hover:font-semibold"
                >
                  Mark All As Read
                </Link>
              )}>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="-mx-2 border-t border-gray-100 dark:border-gray-700">
                {
                  notifications.length > 0 && notifications.map((notification: Notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                }
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </AppLayout >
  );
}
