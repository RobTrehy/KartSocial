import ActionSection from '@/Components/ActionSection';
import InputLabel from '@/Components/Forms/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { User } from '@/types';
import { router } from '@inertiajs/core';
import React from 'react';

interface Props {
  user: User;
}

export default function AdminProfilePhotosForm({ user }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  function deletePhoto() {
    router.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
    });
  }

  function deleteCover() {
    router.delete(route('current-user-cover.destroy'), {
      preserveScroll: true,
    });
  }

  return (
    <ActionSection
      title={'Profile Images'}
      description={`You can only remove a users image, not upload one.`}
    >
      <div className="grid grid-cols-6 gap-6">
        {/* <!-- Profile Photo --> */}
        {page.props.jetstream.managesProfilePhotos ? (
          <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="photo" value="Photo" />

            {/* <!-- Current Profile Photo --> */}
            <div className="mt-2">
              <img
                src={user.profile_photo_url}
                alt={user.name}
                className="rounded-md h-20 w-20 object-cover"
              />
            </div>

            {user.profile_photo_url ? (
              <SecondaryButton
                type="button"
                className="mt-2"
                onClick={deletePhoto}
              >
                Remove Photo
              </SecondaryButton>
            ) : null}
          </div>
        ) : null}

        {/* <!-- Cover Photo --> */}
        {page.props.jetstream.managesProfilePhotos ? (
          <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="cover" value="Cover Image" />

            {/* <!-- Current Cover Photo --> */}
            <div className="mt-2">
              <img
                src={user.cover_photo_url}
                alt={user.name}
                className="rounded-md w-full h-48 object-cover"
              />
            </div>

            {user.cover_photo_url ? (
              <SecondaryButton
                type="button"
                className="mt-2"
                onClick={deleteCover}
              >
                Remove Cover Image
              </SecondaryButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </ActionSection>
  );
}
