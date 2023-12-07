import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface Props {
  noBorder?: boolean;
}

export default function AccordionItem(props: PropsWithChildren<Props>) {
  return (
    <div className={classNames(
      props.noBorder ? '' : 'border dark:border-gray-700',
      'bg-white -mt-px first:rounded-t-md last:rounded-b-md dark:bg-gray-800',
    )}>
      {props.children}
    </div>
  );
}
