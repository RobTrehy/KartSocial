import SectionBorder from '@/Components/SectionBorder';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import UpdateProfileForm from './Partials/UpdateProfileForm';
import UpdateProfilePhotosForm from './Partials/UpdateProfilePhotosForm';

interface Props {
  trackSelect: Object;
  selectedTrack: Object;
}

export default function Edit(props: Props) {
  const page = useTypedPage();

  return (
    <AppLayout
      title={'Update Profile'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Update Profile
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 md:px-6 lg:px-8">
          {page.props.jetstream.managesProfilePhotos ? (
            <div>
              <UpdateProfilePhotosForm user={page.props.auth.user!} />

              <SectionBorder />
            </div>
          ) : null}

          <div className="mt-10 md:mt-0">
            <UpdateProfileForm user={page.props.auth.user!} {...props} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
