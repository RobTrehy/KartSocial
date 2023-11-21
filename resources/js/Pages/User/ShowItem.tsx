import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import FollowedBy from './Partials/FollowedBy';
import Header from './Partials/Header';
import Upcoming from './Partials/Upcoming';

import * as Cards from '@/Components/Feed/Cards';

export default function Show({ user, following, item }: any) {
  //@ts-ignore
  let C = Cards[item.card_type];

  return (
    <AppLayout title={user.alias}>
      <Header user={user} following={following} />

      <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
        <div className="overflow-hidden pb-8">
          <div className="flex gap-x-6 ">
            <div className="w-96 flex flex-col gap-y-4">
              <Upcoming user={user} />
              <FollowedBy user={user} />
            </div>
            <div className="w-full flex flex-col gap-y-4">
              {C !== undefined ? (
                item.parent ? (
                  <>GROUP ITEM?</>
                ) : (
                  <C {...item} />
                )
              ) : (
                <p>Card `{item.card_type}` not found! </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
