import React, { PropsWithChildren } from 'react';

export default function CardHeader(props: PropsWithChildren) {

    return (
        <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
                {props.children}
            </div>
            {props.actions}
        </div>
    )
}