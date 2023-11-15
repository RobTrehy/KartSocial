import SectionTitle from '@/Components/SectionTitle';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface Props {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
  noGrid?: boolean;
}

export default function FormSection({
  onSubmit,
  renderActions,
  title,
  description,
  noGrid = false,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <SectionTitle title={title} description={description} />

      <div className="mt-5 md:mt-0 md:col-span-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div
            className={classNames(
              'px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow',
              hasActions
                ? 'sm:rounded-tl-md sm:rounded-tr-md'
                : 'sm:rounded-md',
            )}
          >
            <div className={`${(noGrid) ? '' : 'grid grid-cols-6 gap-6'}`}>{children}</div>
          </div>

          {hasActions && (
            <div className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
              {renderActions?.()}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
