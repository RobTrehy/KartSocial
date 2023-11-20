import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import React from 'react';
import TrackVisitCard from '../User/Partials/TrackVisitCard';

export default function Show(props: any) {
  const { visit, auth } = props;
  const route = useRoute();

  return (
    <AppLayout
      title="Track Visit"
      renderHeader={() => (
        <div className="flex flex-row items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Track Visit
          </h2>
          <div className="ml-auto flex gap-x-2">
            {visit?.user_id === auth.user.id && (
              <>
                <SecondaryButton
                  onClick={() =>
                    router.visit(route('visits.edit', { visit: visit.id }))
                  }
                >
                  Edit Visit
                </SecondaryButton>
                <SecondaryButton
                  onClick={() =>
                    router.visit(
                      route('visits.sessions.create', { visit: visit.id }),
                    )
                  }
                >
                  Add Session
                </SecondaryButton>
              </>
            )}
          </div>
        </div>
      )}
    >
      <div className="py-4 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <TrackVisitCard {...props} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
