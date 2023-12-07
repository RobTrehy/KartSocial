import React, { ReactElement, useContext } from 'react';

import { AccordionContext } from './AccordionGroup';

interface Props {
  id: string | number;
  open?: ReactElement
  closed?: ReactElement
}

export default function AccordionOpenIcon(props: any) {
  const { open }: any = useContext(AccordionContext);

  if (open === props.id) return props.open ? props.open : (
    <svg
      className="w-3 h-3"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 8.85999L14.5 8.85998"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
  else return props.closed ? props.closed : (
    <svg
      className="w-3 h-3"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 8.85999L14.5 8.85998"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 15.36L8 2.35999"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
