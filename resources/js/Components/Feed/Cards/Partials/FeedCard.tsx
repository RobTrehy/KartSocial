import React, { PropsWithChildren } from 'react';

export default function FeedCard(props: PropsWithChildren) {

    return (
        <div className="flex flex-col text-gray-800 dark:text-white bg-white border rounded-lg px-4 pt-4 dark:bg-gray-800 dark:border-gray-700 w-full">
            {props.children}
        </div>
    )
}