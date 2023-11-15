import DashboardFeed from '@/Components/Feed/DashboardFeed';
import React from 'react';
import UserPageLayout, { UserPageLayoutProps } from './Layouts/UserPageLayout';

interface FeedItem {
    parent: {
        id: number;
    };
    card_type: string;
}

type Props<p = UserPageLayoutProps> = p & {
    feed: Array<FeedItem>;
}

export default function Show({ feed, ...props }: Props<UserPageLayoutProps>) {
    return (
        <UserPageLayout {...props}>
            <DashboardFeed feed={feed} />
        </UserPageLayout>
    )
}