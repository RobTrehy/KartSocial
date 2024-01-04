import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';
import { Map } from 'pigeon-maps';
import { osm } from 'pigeon-maps/providers';
import React, { Key, useEffect, useState } from 'react';
import { Marker } from './Marker';
import { MarkerDot } from './MarkerDot';

interface Props {
  tracks: number[];
}

export default function TrackMap({ tracks }: Props) {
  const route = useRoute();

  const [location, setLocation] = useState([0, 0]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(PositionSuccess, PositionError);
    }
  }, []);

  const PositionSuccess = (position: GeolocationPosition) => {
    setLocation([position.coords.latitude, position.coords.longitude]);
  }

  const PositionError = () => {
    setLocation([0, 0]);
  }

  return (
    <div style={{ height: 'calc(100vh - 147px)' }}>
      <Map defaultCenter={[54.093409, -2.89479]} defaultZoom={6} provider={osm}>
        {tracks.map((track: any, i: Key) => {
          if (track.lat && track.lng) {
            return (
              <Marker
                width={40}
                anchor={[+track.lat, +track.lng]}
                text={track.name}
                color={track.my_laps_count > 0 ? '#16A34A' : '#4E76C2'}
                onClick={() =>
                  router.visit(route('tracks.show', { track: track.slug }))
                }
                key={i}
              />
            );
          }
        })}
        {
          location[0] !== 0 ? (
            <MarkerDot
              width={10}
              anchor={location}
              color="bg-yellow-400"
              pulseColor="bg-yellow-300"
            />
          ) : null
        }
      </Map>
    </div>
  );
}
