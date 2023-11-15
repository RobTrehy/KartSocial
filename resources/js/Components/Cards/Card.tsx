import React from 'react';

export default function Card(props: any) {
  return (
    <div className="flex flex-col text-gray-800 dark:text-white bg-white border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 w-full">
      {props.children}
    </div>
  );
}
