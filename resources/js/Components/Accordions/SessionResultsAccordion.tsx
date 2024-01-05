import AccordionBody from '@/Elements/Accordion/AccordionBody';
import AccordionGroup from '@/Elements/Accordion/AccordionGroup';
import AccordionItem from '@/Elements/Accordion/AccordionItem';
import AccordionOpenIcon from '@/Elements/Accordion/AccordionOpenIcon';
import AccordionTitle from '@/Elements/Accordion/AccordionTitle';
import { toOrdinal } from '@/Helpers/ToOrdinal';
import { Driver, TrackSession } from '@/types';
import React from 'react';
import LapsTable from '../Tables/LapsTable';
import ProfilePhoto from '../UserPhotos/ProfilePhoto';

interface Props {
    session: TrackSession
}

export default function SessionResultsAccordion({ session }: Props) {

    const DriverAccordion = ({ session }: { session: TrackSession }) => {
        const d: Array<any> = [];
        for (let i = 3; i < session.total_drivers; i++) {
            let _driver = session.drivers.filter((driver: Driver) => driver.pivot.position === i + 1)[0];
            if (_driver) {
                d.push(
                    <AccordionItem noBorder key={i + 1}>
                        <AccordionTitle
                            custom
                            commonClasses="w-full border-b dark:border-gray-700 font-semibold py-1 px-4"
                            id={`driver-${i + 1}`}
                        >
                            <div className="flex flex-row items-center gap-x-2">
                                <AccordionOpenIcon id={`driver-${i + 1}`} />
                                {toOrdinal(i + 1)} - {_driver ? _driver.alias : 'Unknown Driver'}
                            </div>
                        </AccordionTitle>
                        <AccordionBody id={`driver-${i + 1}`}>
                            <div className="border-b dark:border-gray-700">
                                <LapsTable driver={session.drivers.filter((driver: Driver) => driver.pivot.position === i + 1)[0]} />
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                )
            } else {
                d.push(
                    <AccordionTitle
                        key={i + 1}
                        custom
                        commonClasses="w-full border-b dark:border-gray-700 font-semibold py-1 px-4"
                        id={`driver-${i + 1}`}
                    >
                        <div className="flex flex-row items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            {toOrdinal(i + 1)} - Unknown Driver
                        </div>
                    </AccordionTitle>
                )
            }
        }
        return d;
    }

    return (
        <AccordionGroup>
            <AccordionItem noBorder>
                <AccordionTitle
                    custom
                    commonClasses="w-full border-b dark:border-gray-700"
                    id="top-3"
                >
                    <div className="flex flex-col">
                        <div className="flex flex-row h-36 items-end">
                            <div className="w-1/3 pb-2 bg-brand-500 text-center text-white">
                                <div className="flex flex-col items-center">
                                    {
                                        session.total_drivers > 1 ? (
                                            <>
                                                2nd
                                                {
                                                    session.drivers.filter((driver: Driver) => driver.pivot.position === 2)[0] ?
                                                        <ProfilePhoto
                                                            size='sm'
                                                            user={session.drivers.filter((driver: Driver) => driver.pivot.position === 2)[0]}
                                                        /> :
                                                        <ProfilePhoto
                                                            size="sm"
                                                            user={{
                                                                alias: 'Unknown Driver',
                                                                profile_photo_url: 'https://ui-avatars.com/api/?name=2&color=7F9CF5&background=EBF4FF'
                                                            }}
                                                        />
                                                }
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className="w-1/3 pb-2 bg-brand-900 text-center text-white">
                                <div className="flex flex-col items-center">
                                    1st
                                    {
                                        session.drivers.filter((driver: Driver) => driver.pivot.position === 1)[0] ?
                                            <ProfilePhoto
                                                size='md'
                                                user={session.drivers.filter((driver: Driver) => driver.pivot.position === 1)[0]}
                                            /> :
                                            <ProfilePhoto
                                                size="md"
                                                user={{
                                                    alias: 'Unknown Driver',
                                                    profile_photo_url: 'https://ui-avatars.com/api/?name=1&color=EBF4FF&background=7F9CF5'
                                                }}
                                            />
                                    }
                                </div>
                            </div>
                            <div className="w-1/3 pb-2 bg-brand-300 text-center text-white">
                                <div className="flex flex-col items-center">
                                    {
                                        session.total_drivers > 2 ? (
                                            <>
                                                3rd
                                                {
                                                    session.drivers.filter((driver: Driver) => driver.pivot.position === 3)[0] ?
                                                        <ProfilePhoto
                                                            size='xs'
                                                            user={session.drivers.filter((driver: Driver) => driver.pivot.position === 3)[0]}
                                                        /> :
                                                        <ProfilePhoto
                                                            size="xs"
                                                            user={{
                                                                alias: 'Unknown Driver',
                                                                profile_photo_url: 'https://ui-avatars.com/api/?name=3&color=7F9CF5&background=EBF4FF'
                                                            }}
                                                        />
                                                }
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="w-1/3 flex flex-row items-center justify-center gap-x-2 font-semibold">
                                {
                                    session.total_drivers > 1 ? (
                                        <>
                                            <AccordionOpenIcon id="top-3" />
                                            {
                                                session.drivers.filter((driver: Driver) => driver.pivot.position === 2)[0] ?
                                                    session.drivers.filter((driver: Driver) => driver.pivot.position === 2)[0]?.alias :
                                                    'Unknown Driver'
                                            }
                                        </>
                                    ) : null
                                }
                            </div>
                            <div className="w-1/3 flex flex-row items-center justify-center gap-x-2 font-semibold">
                                <AccordionOpenIcon id="top-3" />
                                {
                                    session.drivers.filter((driver: Driver) => driver.pivot.position === 1)[0] ?
                                        session.drivers.filter((driver: Driver) => driver.pivot.position === 1)[0]?.alias :
                                        'Unknown Driver'
                                }
                            </div>
                            <div className="w-1/3 flex flex-row items-center justify-center gap-x-2 font-semibold">
                                {
                                    session.total_drivers > 2 ? (
                                        <>
                                            <AccordionOpenIcon id="top-3" />
                                            {
                                                session.drivers.filter((driver: Driver) => driver.pivot.position === 3)[0] ?
                                                    session.drivers.filter((driver: Driver) => driver.pivot.position === 3)[0]?.alias :
                                                    'Unknown Driver'
                                            }
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                </AccordionTitle>
                <AccordionBody id="top-3">
                    <div className="flex flex-row border-b-2 dark:border-gray-700">
                        <div className="w-1/3">
                            <LapsTable driver={session.drivers.filter((driver: Driver) => driver.pivot.position === 2)[0]} />
                        </div>
                        <div className="w-1/3">
                            <LapsTable driver={session.drivers.filter((driver: Driver) => driver.pivot.position === 1)[0]} />
                        </div>
                        <div className="w-1/3">
                            <LapsTable driver={session.drivers.filter((driver: Driver) => driver.pivot.position === 3)[0]} />
                        </div>
                    </div>
                </AccordionBody>
            </AccordionItem>
            {
                ((session.total_drivers - 3) >= 1) && (
                    <DriverAccordion session={session} />
                )
            }
        </AccordionGroup>
    )
}