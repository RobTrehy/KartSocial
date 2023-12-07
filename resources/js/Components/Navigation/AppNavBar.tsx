import { ToBool } from '@/Helpers/ToBool';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Link, router } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Dropdown from '../Dropdown';
import DropdownLink from '../DropdownLink';
import IntialsLogo from '../Logos/InitialsLogo';
import NavLink from '../NavLink';
import AppSearch from '../Search/AppSearch';
import ResponsiveNavLink from './Links/ResponsiveNavLink';

export default function AppNavBar() {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [showingFeedbackDropdown, setShowingFeedbackDropdown] = useState(false);

  const [isDarkMode, setDarkMode] = useState(false);

  const changeDarkMode = (checked: boolean) => {
    setDarkMode(checked);

    if (checked) {
      localStorage.setItem('darkMode', 'true');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.removeItem('darkMode');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const darkMode = ToBool(localStorage.getItem('darkMode'));
    if (darkMode) {
      changeDarkMode(darkMode);
    }

    if (page.props.auth.user) {
      let user = page.props.auth.user;
      (function (w, d, i, s) {
        function l() {
          if (!d.getElementById(i)) {
            var f = d.getElementsByTagName(s)[0],
              e = d.createElement(s);
            (e.type = 'text/javascript'),
              (e.async = !0),
              (e.src = 'https://canny.io/sdk.js'),
              f.parentNode.insertBefore(e, f);
          }
        }
        if ('function' != typeof w.Canny) {
          var c = function () {
            c.q.push(arguments);
          };
          (c.q = []),
            (w.Canny = c),
            'complete' === d.readyState
              ? l()
              : w.attachEvent
                ? w.attachEvent('onload', l)
                : w.addEventListener('load', l, !1);
        }
      })(window, document, 'canny-jssdk', 'script');
      //@ts-ignore
      Canny('identify', {
        appID: '64fb01c597ca51874ac72e3b',
        user: {
          avatarURL: user.profile_photo_path, // optional, but preferred
          email: user.email,
          id: user.id,
          name: user.name,
          created: new Date(user.created_at).toISOString(),
          customFields: {
            alias: user.alias,
          },
        },
      });
    }
  }, []);

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      {/* <!-- Primary Navigation Menu --> */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          <div className="flex flex-1">
            {/* <!-- Logo --> */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href={page.props.auth.user ? route('dashboard') : route('home')}
              >
                <IntialsLogo classes="text-4xl text-brand-600" secondaryClasses='text-brand-500' />
              </Link>
            </div>

            {/* <!-- Main Navigation Links --> */}
            <div className="hidden space-x-4 lg:space-x-8 md:-my-px md:ml-10 md:flex">
              <NavLink
                href={route('tracks.index')}
                active={route().current('tracks.index')}
              >
                Tracks
              </NavLink>
              {page.props.auth.user && (
                <NavLink
                  href={route('visits.index')}
                  active={route().current('visits.index')}
                >
                  Track Log
                </NavLink>
              )}
            </div>
            {page.props.auth.user && <AppSearch breakpoint="lg" />}
          </div>

          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="ml-3 flex items-center gap-x-3 relative">
              {/* <!-- Canny Product Feedback --> */}
              <Dropdown
                align="right"
                width="48"
                renderTrigger={() => (
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                    >
                      {page.props.app_feedback_label}

                      <svg
                        className="ml-2 -mr-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </span>
                )}
              >
                <div className="block px-4 py-2 text-xs text-center text-gray-400">
                  {page.props.app_version}
                </div>
                <DropdownLink
                  as="a"
                  href="https://kartsocial.canny.io/report-issues"
                >
                  Report Issues
                </DropdownLink>
                <DropdownLink
                  as="a"
                  href="https://kartsocial.canny.io/feature-requests"
                >
                  Feature Requests
                </DropdownLink>
                <DropdownLink
                  as="a"
                  href="https://kartsocial.canny.io/changelog"
                >
                  Changelog
                </DropdownLink>
              </Dropdown>

              {/* <!-- DarkMode Toggle --> */}
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={changeDarkMode}
                size={25}
              />

              {/* <!-- Register/Login --> */}
              {!page.props.auth.user && (
                <>
                  <Link
                    href={route('login')}
                    className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-brand-700 dark:hover:text-brand-300 transition ease-in-out duration-150"
                  >
                    Login
                  </Link>

                  <Link
                    href={route('register')}
                    className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-brand-700 dark:hover:text-brand-300 transition ease-in-out duration-150"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* <!-- Account Dropdown --> */}
              {page.props.auth.user && (
                <Dropdown
                  align="right"
                  width="48"
                  renderTrigger={() => (
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                      >
                        <img
                          className="h-8 w-8 mr-2 rounded-full object-cover"
                          src={page.props.auth.user?.profile_photo_url}
                          alt={page.props.auth.user?.name}
                        />
                        {page.props.auth.user?.name}

                        <svg
                          className="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                >
                  {/* <!-- Account Management --> */}
                  <div className="block px-4 py-2 text-xs text-gray-400">
                    Manage Account
                  </div>

                  <DropdownLink
                    href={route('profile.show', {
                      alias: page.props.auth.user?.alias,
                    })}
                  >
                    View My Profile
                  </DropdownLink>

                  <DropdownLink href={route('user-profile.edit')}>
                    Edit My Profile
                  </DropdownLink>

                  <DropdownLink href={route('account.show')}>
                    Account Settings
                  </DropdownLink>

                  {page.props.jetstream.hasApiFeatures ? (
                    <DropdownLink href={route('api-tokens.index')}>
                      API Tokens
                    </DropdownLink>
                  ) : null}

                  <div className="border-t border-gray-200 dark:border-gray-600"></div>

                  {/* <!-- Authentication --> */}
                  <form onSubmit={logout}>
                    <DropdownLink as="button">Log Out</DropdownLink>
                  </form>

                  <div className="border-t border-gray-200 dark:border-gray-600"></div>

                  {/* <!-- Invitations (ALPHA) --> */}
                  <div className="block px-4 pt-4 pb-2 text-xs text-gray-400 text-center">
                    Invitations
                  </div>

                  <DropdownLink href={route('user-invitations.show')}>
                    <div className="text-center -mb-0.5">
                      <div className="bg-gray-200 text-gray-900 w-full rounded-full text-xs py-0 leading-none text-center relative h-[12px] mb-0.5">
                        <div className="absolute z-20 w-full">
                          {page.props.auth.user.invited_count}/
                          {page.props.max_invites}
                        </div>
                        <div
                          className="absolute z-10 bg-blue-500 rounded-full text-xs leading-none h-[12px] text-center"
                          style={{
                            width: `${(page.props.auth.user.invited_count /
                              page.props.max_invites) *
                              100
                              }%`,
                          }}
                        />
                      </div>
                      Invite New User
                    </div>
                  </DropdownLink>
                </Dropdown>
              )}
            </div>
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            {/* <!-- Feedback Mobile Dropdown --> */}
            <button
              type="button"
              onClick={() => {
                if (showingNavigationDropdown) {
                  setShowingNavigationDropdown(false);
                }
                setShowingFeedbackDropdown(!showingFeedbackDropdown);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
            >
              alpha
            </button>

            {/* <!-- Hamburger --> */}
            <button
              type="button"
              title="Menu"
              onClick={() => {
                if (showingFeedbackDropdown) {
                  setShowingFeedbackDropdown(false);
                }
                setShowingNavigationDropdown(!showingNavigationDropdown);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
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

      {/* <!-- Responsive Feedback Menu --> */}
      <div
        className={classNames('md:hidden', {
          block: showingFeedbackDropdown,
          hidden: !showingFeedbackDropdown,
        })}
      >
        <div className="pt-2 pb-3 space-y-1">
          <ResponsiveNavLink
            as="a"
            href="https://kartsocial.canny.io/report-issues"
          >
            Report Issues
          </ResponsiveNavLink>
          <ResponsiveNavLink
            as="a"
            href="https://kartsocial.canny.io/feature-requests"
          >
            Feature Requests
          </ResponsiveNavLink>
          <ResponsiveNavLink
            as="a"
            href="https://kartsocial.canny.io/changelog"
          >
            Changelog
          </ResponsiveNavLink>
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
          {page.props.auth.user && (
            <>
              <ResponsiveNavLink
                href={route('dashboard')}
                active={route().current('dashboard')}
              >
                Dashboard
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route('tracks.index')}
                active={route().current('tracks.index')}
              >
                Tracks
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route('visits.index')}
                active={route().current('visits.index')}
              >
                Track Log
              </ResponsiveNavLink>
            </>
          )}
          {!page.props.auth.user && (
            <>
              <ResponsiveNavLink
                href={route('login')}
                active={route().current('login')}
              >
                Login
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route('register')}
                active={route().current('register')}
              >
                Register
              </ResponsiveNavLink>
            </>
          )}
        </div>

        {/* <!-- Responsive Account Options --> */}
        {page.props.auth.user && (
          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center px-4">
              {page.props.jetstream.managesProfilePhotos ? (
                <div className="flex-shrink-0 mr-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={page.props.auth.user?.profile_photo_url}
                    alt={page.props.auth.user?.name}
                  />
                </div>
              ) : null}

              <div>
                <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                  {page.props.auth.user?.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {page.props.auth.user?.email}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink
                href={route('profile.show', {
                  alias: page.props.auth.user.alias,
                })}
                active={route().current('profile.show')}
              >
                View My Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route('user-profile.edit')}
                active={route().current('user-profile.edit')}
              >
                Edit My Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route('account.show')}
                active={route().current('account.show')}
              >
                Account Settings
              </ResponsiveNavLink>

              {page.props.jetstream.hasApiFeatures ? (
                <ResponsiveNavLink
                  href={route('api-tokens.index')}
                  active={route().current('api-tokens.index')}
                >
                  API Tokens
                </ResponsiveNavLink>
              ) : null}

              {/* <!-- Authentication --> */}
              <form method="POST" onSubmit={logout}>
                <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
