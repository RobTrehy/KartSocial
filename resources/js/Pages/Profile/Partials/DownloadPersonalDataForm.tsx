import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import React from 'react';

export default function DownloadPersonalDataForm() {
  const route = useRoute();
  const form = useForm();

  const requestData = () => {
    form.post(route('user.personal-data-request'), {
      preserveScroll: true,
    });
  };

  return (
    <ActionSection
      title={'Personal Data'}
      description={
        'Request a copy of all of your personal data stored on the system.'
      }
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        If you'd like to receive a copy of all of the data we hold for you, you
        can do so by clicking the button below.
        <br />
        The data will be collected and when ready, you'll receive an email with
        a link to download the data.
      </div>

      <div className="flex items-center mt-5">
        <PrimaryButton onClick={requestData}>Request My Data</PrimaryButton>

        <ActionMessage on={form.recentlySuccessful} className="ml-3">
          Data Requested!
        </ActionMessage>
      </div>
    </ActionSection>
  );
}
