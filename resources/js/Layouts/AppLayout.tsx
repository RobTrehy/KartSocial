import Banner from '@/Components/Banner';
import AdminNavBar from '@/Components/Navigation/Admin/AdminNavBar';
import AppNavBar from '@/Components/Navigation/AppNavBar';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();

  return (
    <div>
      <Head title={title} />

      <Banner />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="sticky top-0 z-[100] w-full">
          {page.props.auth.permissions &&
            page.props.auth.permissions.includes('admin.access') && (
              <AdminNavBar />
            )}
          <AppNavBar />

          {/* <!-- Page Heading --> */}
          {renderHeader ? (
            <header className="bg-white dark:bg-gray-800 shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {renderHeader()}
              </div>
            </header>
          ) : null}
        </div>

        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
