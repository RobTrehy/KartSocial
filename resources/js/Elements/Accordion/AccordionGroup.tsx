import React, { PropsWithChildren, createContext, useState } from 'react';

export const AccordionContext = createContext({});

interface Props {
  defaultOpen?: string | number;
  toggle?: any;
}

export default function (props: PropsWithChildren<Props>) {
  const [open, setOpen] = useState<string | number | null>(props.defaultOpen || null);

  const toggle: any = (id: string) => {
    setOpen(open !== id ? id : null);
  };

  return (
    <AccordionContext.Provider
      value={{
        open: open,
        toggle,
      }}
    >
      <div className="accordion-group group">{props.children}</div>
    </AccordionContext.Provider>
  );
}
