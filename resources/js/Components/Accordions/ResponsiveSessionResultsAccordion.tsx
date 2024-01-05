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

export default function ResponsiveSessionResultsAccordion({ session }: Props) {

    const DriverAccordion = ({ session }: Props) => {
        const d: Array<any> = [];
        for (let i = 0; i < session.total_drivers; i++) {
            let _driver = session.drivers.filter((driver: Driver) => driver.pivot.position === i + 1)[0];
            if (_driver) {
                d.push(
                    <AccordionItem noBorder key={i + 1}>
                        <AccordionTitle
                            custom
                            commonClasses={`w-full border-b dark:border-gray-700 font-semibold py-1 px-4
                            ${(_driver.pivot.position === 1) ? 'border-brand-900 bg-brand-900 text-white' : ''}
                            ${(_driver.pivot.position === 2) ? 'border-brand-500 bg-brand-500 text-white' : ''}
                            ${(_driver.pivot.position === 3) ? 'border-brand-300 bg-brand-300 text-white' : ''}`}
                            id={`driver-${i + 1}`}
                        >
                            <div className="flex flex-row items-center gap-x-2">
                                <AccordionOpenIcon id={`driver-${i + 1}`} />
                                <ProfilePhoto
                                    size='xs'
                                    user={session.drivers.filter((driver: Driver) => driver.pivot.position === i + 1)[0]}
                                />
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
                        commonClasses={`w-full border-b dark:border-gray-700 font-semibold py-1 px-4
                        ${(i + 1 === 1) ? 'border-brand-900 bg-brand-900 text-white' : ''}
                        ${(i + 1 === 2) ? 'border-brand-500 bg-brand-500 text-white' : ''}
                        ${(i + 1 === 3) ? 'border-brand-300 bg-brand-300 text-white' : ''}`}
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
            {
                session.total_drivers >= 1 && (
                    <DriverAccordion session={session} />
                )
            }
        </AccordionGroup>
    )
}