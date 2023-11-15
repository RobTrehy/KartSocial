import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import { Map } from 'pigeon-maps';
import React, { Key } from 'react';
import { Marker } from './Marker';

interface Props {
  tracks: number[];
}

export default function TrackMap({ tracks }: Props) {
  const route = useRoute();

  return (
    <div style={{ height: 'calc(100vh - 147px)' }}>
      <Map defaultCenter={[54.093409, -2.89479]} defaultZoom={6}>
        {tracks.map((track: any, i: Key) => {
          if (track.lat && track.lng) {
            return (
              <Marker
                width={40}
                anchor={[+track.lat, +track.lng]}
                text={track.name}
                color={track.my_laps_count > 0 ? '#16A34A' : '#4E76C2'}
                onClick={() =>
                  router.visit(route('tracks.show', { track: track.id }))
                }
                key={i}
              />
            );
          }
        })}
      </Map>
    </div>
  );
}
