import React, { useContext } from 'react';

import classNames from 'classnames';
import { AccordionContext } from './AccordionGroup';

export default function AccordionTitle(props: any) {
    const { toggle, open }: any = useContext(AccordionContext);

    const classes = classNames(
        (props.id === open)
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

    return (
        <button
            type="button"
            className={classes}
            onClick={() => toggle(props.id)}
        >
            {props.children}
        </button>
    )
}