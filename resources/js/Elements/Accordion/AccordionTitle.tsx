import React, { PropsWithChildren, useContext } from 'react';

import classNames from 'classnames';
import { AccordionContext } from './AccordionGroup';

interface Props {
  id: string | number;
  custom?: boolean;
  openClasses?: string;
  closedClasses?: string;
  commonClasses?: string;
}



export default function AccordionTitle(props: PropsWithChildren<Props>) {
  const { toggle, open }: any = useContext(AccordionContext);

  const classes = classNames(
    props.id === open
      ? 'text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400'
      : 'text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400',
    'inline-flex',
    'items-center',
    'gap-x-3',
    'w-full',
    'font-semibold',
    'text-left',
    'transition',
    'py-4',
    'px-5',
  );

  const customClasses = classNames(
    props.id === open
      ? props.openClasses
      : props.closedClasses,
    props.commonClasses
  )

  return (
    <button type="button" className={(props.custom) ? customClasses : classes} onClick={() => toggle(props.id)}>
      {props.children}
    </button>
  );
}
