import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';

interface Props {
    user: User
}

export default function UserProfileSimple({ user }: Props) {
    const route = useRoute();

    return (
        <Link
            href={route('profile.show', { alias: user.alias })}
            className="flex flex-col gap-1 group">
            <img src={user.profile_photo_url} className="rounded-md w-full h-full object-cover" alt={user.alias} />
            <p className="text-sm text-center truncate pb-0.5 group-hover:text-brand-500">{user.alias}</p>
        </Link>
    )
}