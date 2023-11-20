import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Forms/Checkbox';
import InputError from '@/Components/Forms/InputError';
import InputHelp from '@/Components/Forms/InputHelp';
import InputLabel from '@/Components/Forms/InputLabel';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

interface Props {
  email: string;
  invitation_token: string;
}

export default function RegisterByInvite({ email, invitation_token }: Props) {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    alias: '',
    dob: '',
    email: email || '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Register" />

      <form onSubmit={onSubmit} className="w-full">
        <p className="mb-5 text-2xl">Join us</p>
        {!invitation_token && (
          <div className="w-full bg-yellow-200 p-2 rounded-md mb-4">
            <h2 className="text-md font-semibold text-yellow-800">
              Invitation Only!
            </h2>
            <p className="text-yellow-600 text-sm">
              We are currently open to registration via invitation only. Please
              follow the link in your invite to register!
            </p>
          </div>
        )}
        <div>
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            onChange={e => form.setData('name', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="name"
          />
          <InputError className="mt-2" message={form.errors.name} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="alias">Display Name</InputLabel>
          <TextInput
            id="alias"
            type="text"
            className="mt-1 block w-full"
            value={form.data.alias}
            onChange={e => form.setData('alias', e.currentTarget.value)}
          />
          <InputError className="mt-2" message={form.errors.alias} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="dob">Date of Birth</InputLabel>
          <TextInput
            id="dob"
            type="date"
            className="mt-1 block w-full"
            value={form.data.dob}
            onChange={e => form.setData('dob', e.currentTarget.value)}
          />
          <InputHelp
            className="mt-2"
            message="This information is private, for registration purposes only."
          />
          <InputError className="mt-2" message={form.errors.dob} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            disabled
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation">
            Confirm Password
          </InputLabel>
          <TextInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={e =>
              form.setData('password_confirmation', e.currentTarget.value)
            }
            required
            autoComplete="new-password"
          />
          <InputError
            className="mt-2"
            message={form.errors.password_confirmation}
          />
        </div>

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <InputLabel htmlFor="terms">
              <div className="flex items-center">
                <Checkbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={e => form.setData('terms', e.currentTarget.checked)}
                  required
                />

                <div className="ml-2">
                  I agree to the&nbsp;
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Terms of Service
                  </a>
                  &nbsp;and&nbsp;
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
              <InputError className="mt-2" message={form.errors.terms} />
            </InputLabel>
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Already registered?
          </Link>

          <PrimaryButton
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Register
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
