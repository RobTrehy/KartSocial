import React from 'react';

export default function CardTitle(props: any) {
  return (
    <div className="text-lg font-bold text-gray-800 dark:text-white">
      {props.children}
    </div>
  );
}
