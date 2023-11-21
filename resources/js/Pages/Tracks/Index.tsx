import InputHelp from '@/Components/Forms/InputHelp';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import TrackList from './Partials/TrackList';
import TrackMap from './Partials/TrackMap';

export default function Index(props: any) {
  const route = useRoute();
  const [list, setList] = useState<boolean>(false);

  return (
    <AppLayout
      title="Tracks"
      renderHeader={() => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-2">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Tracks
          </h2>
          <div className="flex gap-x-2">
            {props.auth.permissions?.includes('tracks.create') && (
              <SecondaryButton
                onClick={() => router.visit(route('tracks.create'))}
              >
                Add Track
              </SecondaryButton>
            )}
            <SecondaryButton onClick={() => setList(!list)}>
              {list ? 'Map View' : 'List View'}
            </SecondaryButton>
          </div>
        </div>
      )}
    >
      {list ? (
        <div className="py-4 md:py-12">
          <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
            <TrackList {...props} />

            {props.auth.permissions?.includes('tracks.create') && (
              <InputHelp className="mt-4 text-center">
                Track Missing?{' '}
                <Link
                  href={route('tracks.create')}
                  className="hover:text-brand-500 duration-500 transition-colors"
                >
                  Submit a new track!
                </Link>
              </InputHelp>
            )}
          </div>
        </div>
      ) : (
        <TrackMap {...props} />
      )}
    </AppLayout>
  );
}
