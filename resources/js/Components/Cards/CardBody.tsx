import React from 'react';

export default function CardBody(props: any) {
  return (
    <div className="mt-2 text-gray-800 dark:text-gray-400">
      {props.children}
    </div>
  );
}
