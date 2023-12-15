import useRoute from '@/Hooks/useRoute';
import classNames from 'classnames';
import React, { useState } from 'react';
import ResponsiveAdminNavLink from '../Links/ResponsiveAdminNavLink';
import AdminNavLink from './AdminNavLink';

export default function AdminNavBar() {
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <nav className="bg-brand-800 border-b border-gray-100 dark:border-gray-700">
      {/* <!-- Primary Navigation Menu --> */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-10 relative">
          <div className="flex flex-1">
            {/* <!-- Logo --> */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-white dark:text-gray-300 flex flex-row gap-x-2 px-1 pt-1 text-sm font-medium leading-5">
                Administration Center
              </div>
            </div>

            {/* <!-- Main Navigation Links --> */}
            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
              <AdminNavLink
                href={route('admin:index')}
                active={route().current('admin:index')}
              >
                Dashboard
              </AdminNavLink>
              <AdminNavLink
                href={route('admin:users.index')}
                active={route().current('admin:users.index')}
              >
                Users
              </AdminNavLink>
            </div>
          </div>

          <div className="flex">
            {/* <!-- Secondary Navigation Links --> */}
            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
              <AdminNavLink
                tag="a"
                href={route('telescope')}
              >
                Telescope
              </AdminNavLink>
              <AdminNavLink
                tag="a"
                href={route('log-viewer.index')}
              >
                Log Viewer
              </AdminNavLink>
            </div>

            {/* <!-- Hamburger --> */}
            <button
              type="button"
              title="Menu"
              onClick={() => {
                setShowingNavigationDropdown(!showingNavigationDropdown);
              }}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={classNames({
                    hidden: showingNavigationDropdown,
                    'inline-flex': !showingNavigationDropdown,
                  })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={classNames({
                    hidden: !showingNavigationDropdown,
                    'inline-flex': showingNavigationDropdown,
                  })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Responsive Navigation Menu --> */}
      <div
        className={classNames('md:hidden', {
          block: showingNavigationDropdown,
          hidden: !showingNavigationDropdown,
        })}
      >
        <div className="pt-2 pb-3 space-y-1">
          <ResponsiveAdminNavLink
            href={route('admin:index')}
            active={route().current('admin:index')}
          >
            Dashboard
          </ResponsiveAdminNavLink>
          <ResponsiveAdminNavLink
            href={route('admin:users.index')}
            active={route().current('admin:users.index')}
          >
            Users
          </ResponsiveAdminNavLink>
          <ResponsiveAdminNavLink
            as="a"
            href={route('telescope')}
          >
            Telescope
          </ResponsiveAdminNavLink>
          <ResponsiveAdminNavLink
            as="a"
            href={route('log-viewer.index')}
          >
            Log Viewer
          </ResponsiveAdminNavLink>
        </div>
      </div>
    </nav>
  );
}
