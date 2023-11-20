import React, { Key } from 'react';
import TrackCard from './TrackCard';

interface Props {
  tracks: number[];
}

export default function TrackList({ tracks }: Props) {
  return (
    <div className="mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 sm:gap-y-4">
        {tracks.map((track: any, i: Key) => {
          return <TrackCard track={track} key={i} />;
        })}
      </div>
    </div>
  );
}
