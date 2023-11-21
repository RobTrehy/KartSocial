import TextLogo from '@/Components/Logos/TextLogo';
import { Head } from '@inertiajs/react';
import React from 'react';

interface Props {
  policy: string;
}

export default function PrivacyPolicy({ policy }: Props) {
  return (
    <div>
      <Head title="Privacy Policy" />

      <div className="font-sans text-gray-900 dark:text-gray-100 antialiased">
        <div className="pt-4 bg-gray-100 dark:bg-gray-900">
          <div className="min-h-screen flex flex-col items-center pt-6 md:pt-0">
            <div>
              <TextLogo classes="text-5xl text-brand-600" secondaryClasses="text-brand-500" />
            </div>

            <div
              className="w-full md:max-w-2xl mt-6 p-6 bg-white dark:bg-gray-800 shadow-md overflow-hidden md:rounded-md prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: policy }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
