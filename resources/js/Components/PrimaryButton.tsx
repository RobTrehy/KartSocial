import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function PrimaryButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={classNames(
        'inline-flex items-center px-4 py-2 bg-brand-800 dark:bg-brand-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-brand-700 dark:hover:bg-white focus:bg-brand-700 dark:focus:bg-white active:bg-brand-900 dark:active:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-brand-800 transition ease-in-out duration-150',
        props.className,
      )}
    >
      {children}
    </button>
  );
}
