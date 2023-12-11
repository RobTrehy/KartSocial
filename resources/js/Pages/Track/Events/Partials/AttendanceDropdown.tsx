import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { Auth, TrackEvent, User } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';

interface Props {
    event: TrackEvent;
    auth: Auth;
}

export default function AttendanceDropdown({ event, auth }: Props) {
    const route = useRoute();
    const prevStatusRef = useRef<string>(
        event.attendees.filter((user: User) => user.id === auth.user?.id)[0]?.pivot.status.value || 'Undecided'
    );

    const form = useForm({
        _method: 'PUT',
        status: event.attendees.filter((user: User) => user.id === auth.user?.id)[0]?.pivot.status.value || 'Undecided',
    });

    useEffect(() => {
        form.setData('status', event.attendees.filter((user: User) => user.id === auth.user?.id)[0]?.pivot.status.value || 'Undecided');
    }, [event.attendees]);

    useEffect(() => {
        if (prevStatusRef.current !== form.data.status) {
            form.put(
                route('events.attendees.update', {
                    event: event.id,
                }),
                {
                    errorBag: 'TrackSession',
                },
            );
            prevStatusRef.current = form.data.status;
        }
    }, [form.data]);

    return (
        <Dropdown
            align="right"
            width="48"
            renderTrigger={() => (
                <SecondaryButton>
                    {form.data.status}
                </SecondaryButton>
            )}
        >
            <DropdownLink
                as="button"
                onClick={() => form.setData('status', 'Attending')}
            >
                Attending
            </DropdownLink>
            <DropdownLink
                as="button"
                onClick={() => form.setData('status', 'Interested')}
            >
                Interested
            </DropdownLink>
            <DropdownLink
                as="button"
                onClick={() => form.setData('status', 'Not Going')}
            >
                Not Going
            </DropdownLink>
            <DropdownLink
                as="button"
                onClick={() => form.setData('status', 'Undecided')}
            >
                Undecided
            </DropdownLink>
        </Dropdown>
    );
}