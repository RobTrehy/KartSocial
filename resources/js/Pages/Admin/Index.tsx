import Card from '@/Components/Cards/Card';
import CardBody from '@/Components/Cards/CardBody';
import CardHeader from '@/Components/Cards/CardHeader';
import CardTitle from '@/Components/Cards/CardTitle';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import React from 'react';

export default function Index({
  track_count,
  csv_track_count,
  track_layouts_count,
  csv_track_layouts_count
}: any) {
  const route = useRoute();
  return (
    <AppLayout
      title="Admin"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Admin
        </h2>
      )}
    >

      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Tracks</CardTitle>
              </CardHeader>
              <CardBody>
                <p>Tracks: {track_count} (in CSV: {csv_track_count})</p>
                <p>Layouts: {track_layouts_count} (in CSV: {csv_track_layouts_count})</p>
                <PrimaryButton
                  onClick={() => router.visit(route('admin:tracks.reseed'))}
                  className="mt-2"
                >
                  Try reseeding
                </PrimaryButton>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

    </AppLayout>
  );
}
