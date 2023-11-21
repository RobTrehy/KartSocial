import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { User } from '@/types';
import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { Buffer } from 'buffer';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { ReactCrop, type Crop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  user: User;
}

export default function UpdateProfilePhotosForm({ user }: Props) {
  const form = useForm({
    _method: 'PUT',
    photo: null as File | null,
    cover: null as File | null,
  });
  const page = useTypedPage();
  const route = useRoute();

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const photoPreviewRef = useRef<HTMLImageElement>(null);
  const [photoCrop, setPhotoCrop] = useState<Crop>({
    unit: 'px',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const coverPreviewRef = useRef<HTMLImageElement>(null);
  const [coverCrop, setCoverCrop] = useState<Crop>({
    unit: 'px',
    width: 210,
    height: 45,
    x: 0,
    y: 0,
  });

  function updateProfilePhotos() {
    form.post(route('user-profile-photos.update'), {
      errorBag: 'updateProfilePhotos',
      onSuccess: () => {
        clearPhotoFileInput();
        clearCoverFileInput();
      },
    });
  }

  function completePhotoCrop() {
    const canvas = document.createElement('canvas');
    const image = photoPreviewRef.current;

    if (image) {
      const crop = photoCrop;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      if (ctx) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'low';

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY,
        );
      }

      const base64Image = canvas.toDataURL('image/png'); // can be changed to jpeg/jpg etc

      if (base64Image) {
        const fileType = base64Image.split(';')[0].split(':')[1];

        const buffer = Buffer.from(
          base64Image.replace(/^data:image\/\w+;base64,/, ''),
          'base64',
        );
        form.setData(
          'photo',
          new File(
            [buffer],
            photoRef.current?.files?.[0].name || 'profile-photo',
            { type: fileType },
          ),
        );
      }
    }
  }

  function completeCoverCrop() {
    const canvas = document.createElement('canvas');
    const image = coverPreviewRef.current;

    if (image) {
      const crop = coverCrop;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      if (ctx) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'low';

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY,
        );
      }

      const base64Image = canvas.toDataURL('image/png'); // can be changed to jpeg/jpg etc

      if (base64Image) {
        const fileType = base64Image.split(';')[0].split(':')[1];

        const buffer = Buffer.from(
          base64Image.replace(/^data:image\/\w+;base64,/, ''),
          'base64',
        );
        form.setData(
          'cover',
          new File(
            [buffer],
            coverRef.current?.files?.[0].name || 'cover-photo',
            { type: fileType },
          ),
        );
      }
    }
  }

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function selectNewCover() {
    coverRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(photo);
  }

  function updateCoverPreview() {
    const cover = coverRef.current?.files?.[0];

    if (!cover) {
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      setCoverPreview(e.target?.result as string);
    };
    reader.readAsDataURL(cover);
  }

  function deletePhoto() {
    router.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
      },
    });
  }

  function deleteCover() {
    router.delete(route('current-user-cover.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setCoverPreview(null);
        clearCoverFileInput();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      setPhotoPreview(null);
      setPhotoCrop({
        unit: 'px',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      });
      form.setData('photo', null);
    }
  }

  function clearCoverFileInput() {
    if (coverRef.current?.value) {
      coverRef.current.value = '';
      setCoverPreview(null);
      setCoverCrop({
        unit: 'px',
        width: 210,
        height: 45,
        x: 0,
        y: 0,
      });
      form.setData('cover', null);
    }
  }

  return (
    <FormSection
      onSubmit={updateProfilePhotos}
      title={'Profile Images'}
      description={`Update your account's profile images.`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >
      {/* <!-- Profile Photo --> */}
      {page.props.jetstream.managesProfilePhotos ? (
        <div className="col-span-6 md:col-span-4">
          {/* <!-- Profile Photo File Input --> */}
          <input
            type="file"
            className="hidden"
            ref={photoRef}
            onChange={updatePhotoPreview}
          />

          <InputLabel htmlFor="photo" value="Photo" />

          {photoPreview ? (
            // <!-- New Profile Photo Preview -->
            <div className="mt-2 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 absolute -top-2 -right-2 z-50"
                onClick={() => {
                  setPhotoPreview(null);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
              <ReactCrop
                aspect={1}
                crop={photoCrop}
                onChange={c => setPhotoCrop(c)}
                onComplete={completePhotoCrop}
              >
                <img src={photoPreview} ref={photoPreviewRef} />
              </ReactCrop>
            </div>
          ) : (
            // <!-- Current Profile Photo -->
            <div className="mt-2">
              <img
                src={user.profile_photo_url}
                alt={user.name}
                className="rounded-md h-20 w-20 object-cover"
              />
            </div>
          )}

          <SecondaryButton
            className="mt-2 mr-2"
            type="button"
            onClick={selectNewPhoto}
          >
            Select A New Photo
          </SecondaryButton>

          {user.profile_photo_path ? (
            <SecondaryButton
              type="button"
              className="mt-2"
              onClick={deletePhoto}
            >
              Remove Photo
            </SecondaryButton>
          ) : null}

          <InputError message={form.errors.photo} className="mt-2" />
        </div>
      ) : null}

      {/* <!-- Cover Photo --> */}
      {page.props.jetstream.managesProfilePhotos ? (
        <div className="col-span-6 md:col-span-4">
          {/* <!-- Cover Photo File Input --> */}
          <input
            type="file"
            className="hidden"
            ref={coverRef}
            onChange={updateCoverPreview}
          />

          <InputLabel htmlFor="cover" value="Cover Image" />

          {coverPreview ? (
            // <!-- New Cover Photo Preview -->
            <div className="mt-2 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 absolute fill-gray-100 cursor-pointer -top-2 -right-2 z-[5000]"
                onClick={() => {
                  setCoverPreview(null);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
              <ReactCrop
                aspect={42 / 9}
                crop={coverCrop}
                onChange={c => setCoverCrop(c)}
                onComplete={completeCoverCrop}
              >
                <img src={coverPreview} ref={coverPreviewRef} />
              </ReactCrop>
            </div>
          ) : (
            // <!-- Current Cover Photo -->
            <div className="mt-2">
              <img
                src={user.cover_photo_url}
                alt={user.name}
                className="rounded-md w-full aspect-[42/9] object-cover"
              />
            </div>
          )}

          <SecondaryButton
            className="mt-2 mr-2"
            type="button"
            onClick={selectNewCover}
          >
            Select A New Cover Image
          </SecondaryButton>

          {user.cover_photo_path ? (
            <SecondaryButton
              type="button"
              className="mt-2"
              onClick={deleteCover}
            >
              Remove Cover Image
            </SecondaryButton>
          ) : null}

          <InputError message={form.errors.cover} className="mt-2" />
        </div>
      ) : null}
    </FormSection>
  );
}
