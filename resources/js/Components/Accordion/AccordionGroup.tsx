import React, { createContext, useState } from 'react';

export const AccordionContext = createContext({});

export default function (props: any) {
    const [open, setOpen] = useState(props.defaultOpen || null);

    const toggle: any = (id: string) => {
        setOpen((open !== id) ? id : null);
    }

    return (
        <AccordionContext.Provider
            value={{
                open: open,
                toggle
            }}
        >
            <div className="accordion-group group">
                {props.children}
            </div>
        </AccordionContext.Provider>
    )
}