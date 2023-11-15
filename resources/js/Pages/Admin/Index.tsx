import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

export default function Index() {
  return (
    <AppLayout
      title="Admin"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Admin
        </h2>
      )}
    ></AppLayout>
  );
}
