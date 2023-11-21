import ActionMessage from '@/Components/ActionMessage';
import DangerButton from '@/Components/DangerButton';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';
import { router, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface Props {
  user: User;
}

export default function AdminRestrictionForm({ user }: Props) {
  const route = useRoute();
  const [duration, setDuration] = useState<string>('1 day');

  const form = useForm({
    reason: '',
    expires_at: moment(),
  });

  useEffect(() => {
    let date: any | null = moment();
    if (duration === '1 day') {
      date.add(1, 'days');
    } else if (duration === '3 days') {
      date.add(3, 'days');
    } else if (duration === '1 week') {
      date.add(1, 'weeks');
    } else if (duration === '1 month') {
      date.add(1, 'months');
    } else if (duration === '6 months') {
      date.add(6, 'months');
    } else if (duration === '1 year') {
      date.add(1, 'years');
    } else if (duration === 'indefinitely') {
      date = null;
    }
    form.setData('expires_at', date.format());
  }, [duration]);

  function restrictUser() {
    form.post(route('admin:user.restrict', { user: user.id }), {
      onSuccess: () => router.reload(),
    });
  }

  return (
    <FormSection
      title={'User Restriction'}
      description={`As a last resort, you can restrict this user from using Kart Social.`}
      onSubmit={restrictUser}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            User Restricted.
          </ActionMessage>

          <DangerButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Restrict User
          </DangerButton>
        </>
      )}
    >
      {/* <!-- Name --> */}
      <div className="col-span-6 md:col-span-4">
        <InputLabel htmlFor="reason" value="Reason" />
        <TextInput
          id="reason"
          type="text"
          className="mt-1 block w-full"
          value={form.data.reason}
          onChange={e => form.setData('reason', e.currentTarget.value)}
        />
        <InputError message={form.errors.reason} className="mt-2" />
      </div>

      {/* <!-- Expire --> */}
      <div className="col-span-6">
        <InputLabel value="Duration" />
        <div className="flex flex-wrap gap-2">
          {duration === '1 day' ? (
            <PrimaryButton>1 Day</PrimaryButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('1 day')}>
              1 Day
            </SecondaryButton>
          )}
          {duration === '3 days' ? (
            <PrimaryButton>3 Days</PrimaryButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('3 days')}>
              3 Days
            </SecondaryButton>
          )}
          {duration === '1 week' ? (
            <PrimaryButton>1 Week</PrimaryButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('1 week')}>
              1 Week
            </SecondaryButton>
          )}
          {duration === '1 month' ? (
            <PrimaryButton>1 Month</PrimaryButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('1 month')}>
              1 Month
            </SecondaryButton>
          )}
          {duration === '6 months' ? (
            <PrimaryButton>6 Months</PrimaryButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('6 months')}>
              6 Months
            </SecondaryButton>
          )}
          {duration === '1 year' ? (
            <PrimaryButton>1 Year</PrimaryButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('1 year')}>
              1 Year
            </SecondaryButton>
          )}
          {duration === 'indefinitely' ? (
            <DangerButton>Indefinitely</DangerButton>
          ) : (
            <SecondaryButton onClick={() => setDuration('indefinitely')}>
              Indefinitely
            </SecondaryButton>
          )}
        </div>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Expiry: </span>
          {duration !== 'indefinitely'
            ? moment(form.data.expires_at).format('Do MMMM YYYY')
            : 'Never'}
        </p>
        <InputError className="mt-2" message={form.errors.expires_at} />
      </div>
    </FormSection>
  );
}
