import React, { useContext } from 'react';

import { AccordionContext } from './AccordionGroup';

export default function AccordionBody(props: any) {
  const { open }: any = useContext(AccordionContext);

  return (
    <div
      className={`accordion-body ${
        open === props.id ? '' : 'hidden'
      } w-full overflow-hidden transition-[height] duration-300`}
    >
      {props.children}
    </div>
  );
}
