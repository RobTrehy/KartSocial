import React from 'react';

export default function CardLink(props: any) {
  return (
    <a
      className="mt-3 inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-500 hover:text-blue-700"
      href={props.href}
    >
      {props.children}
    </a>
  );
}
