import { Driver, User } from '@/types';
import classNames from 'classnames';
import React from 'react';

interface Props {
    user?: User | Driver | Custom;
    size?: string;
}

interface Custom {
    alias: string;
    profile_photo_url: string;
}

export default function ProfilePhoto({ user, size = 'lg' }: Props) {
    const wrapperClasses = classNames(
        (size === 'xs') ? 'h-12 w-12' : '',
        (size === 'sm') ? 'h-16 w-16' : '',
        (size === 'md') ? 'h-24 w-24' : '',
        (size === 'lg') ? 'h-24 md:h-52 w-24 md:w-52' : '',
        (size === 'xl') ? '' : '',
        'p-1 rounded-md backdrop-blur-sm bg-white/30'
    );

    if (!user) {
        return null;
    }

    return (
        <div className={wrapperClasses}>
            <img
                className="h-full w-full rounded-md object-cover"
                src={user.profile_photo_url}
                alt={user.alias}
            />
        </div>
    )
}