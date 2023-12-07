import React, { useContext } from 'react';

import { AccordionContext } from '@/Elements/Accordion/AccordionGroup';
import classNames from 'classnames';

export default function AccordionSessionTitle(props: any) {
  const { toggle, open }: any = useContext(AccordionContext);

  const classes = classNames(
    props.id === open
      ? 'text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400'
      : 'text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400',
    'inline-flex',
    'items-center',
    'gap-x-2',
    'w-full',
    'font-semibold',
    'text-left',
    'transition',
    'py-2',
    'px-4',
  );

  return (
    <button type="button" className={classes} onClick={() => toggle(props.id)}>
      {props.children}
    </button>
  );
}
