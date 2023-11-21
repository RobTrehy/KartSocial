import { Role, User } from '@/types';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
    user: User;
}

export default function FeaturePacks({ user }: Props) {
    const [roles, setRoles] = useState<Array<Role>>([]);

    useEffect(() => {
        if (roles.length === 0) {
            loadRoles();
        }
    }, []);

    const loadRoles = async () => {
        await axios.get('/api/admin/roles')
            .then(json => {
                setRoles(json.data.roles);
            })
            .catch(error => {
                // TODO: Handle Errors
                console.log(error);
            });
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            {
                roles.map((role: Role, i: number) => (
                    <div
                        key={i}
                        className={
                            classNames(
                                user.roles?.some(r => r.name === role.name) ? 'cursor-not-allowed' : 'cursor-pointer',
                                `flex flex-col border ${role.colors.border} p-2 rounded-md dark:text-gray-200 ${role.colors.background}`
                            )
                        }
                    >
                        <p className="font-bold">{role.name}</p>
                        {user.roles?.some(r => r.name === role.name) ?
                            <p>The user already has this feature pack.</p>
                            :
                            <p>Click to assign this feature pack.</p>
                        }
                    </div>
                ))
            }
        </div>
    )
}