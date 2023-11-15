import { useContext } from 'react';

import { AccordionContext } from './AccordionGroup';

export default function AccordionOpenIcon(props: any) {
  const { open }: any = useContext(AccordionContext);

  if (open === props.id) return props.open;
  else return props.closed;
}
