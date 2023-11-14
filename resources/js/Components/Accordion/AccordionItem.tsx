import React from 'react';

export default function AccordionItem(props: any) {
    return (
        <div className="bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700">
            {props.children}
        </div>
    )
}