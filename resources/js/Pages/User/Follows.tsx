import Card from '@/Components/Cards/Card';
import UserProfileSimple from '@/Components/UserProfileSimple';
import { User } from '@/types';
import React from 'react';
import UserPageLayout, { UserPageLayoutProps } from './Layouts/UserPageLayout';

export default function Follows({ user, following }: UserPageLayoutProps) {
  return (
    <UserPageLayout user={user} following={following}>
      <div className="grid grid-cols-5 gap-3 font-semibold">
        {user.follows.map((follower: User, i: number) => (
          <Card key={i}>
            <UserProfileSimple user={follower} />
          </Card>
        ))}
      </div>
    </UserPageLayout>
  );
}
