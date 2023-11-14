import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = {
  as?: string;
  href?: string;
  active?: boolean;
};

export default function ResponsiveNavLink({
  as,
  active,
  href,
  children,
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-brand-400 dark:border-brand-600 text-left text-base font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/50 focus:outline-none focus:text-brand-800 dark:focus:text-brand-200 focus:bg-brand-100 dark:focus:bg-brand-900 focus:border-brand-700 dark:focus:border-brand-300 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out';

  return (
    <div>
      {(() => {
        switch (as) {
          case 'button':
            return (
              <button className={classNames('w-full text-left', classes)}>
                {children}
              </button>
            );
          case 'a':
            return (
              <a
                href={href}
                className={classes}
              >
                {children}
              </a>
            );
          default:
            return (
              <Link href={href || ''} className={classes}>
                {children}
              </Link>
            );
        }
      })()}
    </div>
  );
}
