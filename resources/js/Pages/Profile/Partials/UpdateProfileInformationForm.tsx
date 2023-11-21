import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { User } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  user: User;
}

export default function UpdateProfileInformationForm({ user }: Props) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
  });
  const route = useRoute();
  const page = useTypedPage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={'Profile Information'}
      description={`Update your account's profile information and email address.`}
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
      {/* <!-- Name --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="name" value="Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoComplete="name"
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Email --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <InputError message={form.errors.email} className="mt-2" />

        {page.props.jetstream.hasEmailVerification &&
        user.email_verified_at === null ? (
          <div>
            <p className="text-sm mt-2 dark:text-white">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-gray-800"
                onClick={e => {
                  e.preventDefault();
                  setVerificationLinkSent(true);
                }}
              >
                Click here to re-send the verification email.
              </Link>
            </p>
            {verificationLinkSent && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        ) : null}
      </div>
    </FormSection>
  );
}
