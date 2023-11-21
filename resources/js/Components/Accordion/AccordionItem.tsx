import React from 'react';

export default function AccordionItem(props: any) {
  return (
    <div className="bg-white border -mt-px first:rounded-t-md last:rounded-b-md dark:bg-gray-800 dark:border-gray-700">
      {props.children}
    </div>
  );
}
