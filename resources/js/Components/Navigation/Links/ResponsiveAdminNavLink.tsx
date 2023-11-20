import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = {
  as?: string;
  href?: string;
  active?: boolean;
};

export default function ResponsiveAdminNavLink({
  as,
  active,
  href,
  children,
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-brand-400 text-left text-base font-medium text-white bg-brand-600 focus:outline-none transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-white hover:bg-brand-600 hover:border-brand-400 focus:outline-none transition duration-150 ease-in-out';

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
              <a href={href} className={classes}>
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
