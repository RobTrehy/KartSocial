import React from 'react';

export default function CardSubtitle(props: any) {

    return (
        <div className="mt-1 mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
            {props.children}
        </div>
    );
}
