import { User } from '@/types';
import React from 'react';
import FeedCard from './Partials/FeedCard';
import FeedFooter from './Partials/FeedFooter';
import FeedHeader from './Partials/FeedHeader';

interface Props {
  id: number;
  user: User;
  description: string;
  updated_at: string;
}

export default function ProfilePhotos({
  id,
  user,
  description,
  updated_at,
}: Props) {
  return (
    <FeedCard>
      <FeedHeader user={user} description={description} time={updated_at} />

      <div
        className="w-full aspect-[42/9] rounded-md overflow-hidden bg-center bg-cover relative shadow-md"
        style={{
          backgroundImage: `url('${user.cover_photo_url}')`,
        }}
      >
        <div className="bg-black opacity-50 absolute inset-0"></div>

        <div className="relative flex items-center h-full max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="h-40 w-40 p-1 rounded-md backdrop-blur-sm bg-white/30">
            <img
              className="h-full w-full rounded-md object-cover"
              src={user.profile_photo_url}
              alt={user.alias}
            />
          </div>
        </div>
      </div>
      <FeedFooter id={id} />
    </FeedCard>
  );
}
