import DialogModal from '@/Components/DialogModal';
import InputLabel from '@/Components/Forms/InputLabel';
import Select from '@/Components/Forms/Select';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { toOrdinal } from '@/Helpers/ToOrdinal';
import useRoute from '@/Hooks/useRoute';
import { Driver, TrackEvent, TrackSession } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useEffect } from 'react';

interface Props {
    event: TrackEvent;
    show: boolean;
    change: Function;
}

interface PositionOptionsProps {
    session: TrackSession;
}

export default function MyResultsDialog({ event, show, change }: Props) {
    const route = useRoute();

    const form = useForm({
        _method: 'POST',
        positions: [],
    });

    const savePositions = () => {
        form.post(route('events.drivers', { track: event.track_layout.track.slug, event: event.slug }), {
            errorBag: 'TrackEventDrivers',
            preserveScroll: true,
            onSuccess: () => change(false),
        });
    }

    useEffect(() => {
        event.sessions.map((session: TrackSession) => {
            if (!form.data.positions[session.id]) {
                let _positions = form.data.positions;
                _positions[session.id] = 'dns';
                form.setData('positions', [..._positions]);
            }
        })

    }, [event.sessions]);

    const changePosition = (session: TrackSession, position: string) => {
        let _positions = form.data.positions;
        _positions[session.id] = position;
        form.setData('positions', [..._positions]);
    }

    const PositionOptions = ({ session }: PositionOptionsProps) => {
        let html = [];
        for (let i = 0; i < session.total_drivers; i++) {
            if (session.drivers.filter((driver: Driver) => driver.pivot.position === i + 1)[0]) {
                html.push(
                    <option key={i} disabled value={i + 1}>
                        {toOrdinal(i + 1)} - {session.drivers.filter((driver: Driver) => driver.pivot.position === i + 1)[0].alias}
                    </option>
                )
            } else {
                html.push(<option key={i} value={i + 1}>{toOrdinal(i + 1)}</option>)
            }
        }
        return html;
    }

    return (
        <DialogModal isOpen={show} onClose={() => change(false)}>
            <DialogModal.Content title="My Results">
                {
                    event.sessions.length > 0 ?
                        event.sessions.map((session: TrackSession, i: number) => (
                            <div key={i} className="mb-2">
                                <InputLabel value={`Result for ${session.name}`} htmlFor={session.id} />
                                <Select
                                    id={session.id.toString()}
                                    className="mr-1 w-full"
                                    value={form.data.positions[session.id]}
                                    onChange={e => changePosition(session, e.currentTarget.value)}
                                >
                                    <PositionOptions session={session} />
                                    <option value="dns">Did Not Take Part</option>
                                </Select>
                            </div>
                        ))
                        : <>No Sessions Added!</>
                }
            </DialogModal.Content>

            <DialogModal.Footer>
                <SecondaryButton onClick={() => change(false)}>Cancel</SecondaryButton>

                <PrimaryButton
                    className={classNames('ml-2', { 'opacity-25': form.processing })}
                    onClick={savePositions}
                    disabled={form.processing}
                >
                    Save
                </PrimaryButton>
            </DialogModal.Footer>
        </DialogModal>
    );
}