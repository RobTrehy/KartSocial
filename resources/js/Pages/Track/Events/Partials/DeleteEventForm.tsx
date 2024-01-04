import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  id: number;
}

export default function DeleteEventForm({ id }: Props) {
  const route = useRoute();
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const form = useForm();

  function confirmDeletion() {
    setConfirmingDeletion(true);
  }

  function deleteEvent() {
    form.delete(route('events.destroy', { event: id }), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingDeletion(false);
    form.reset();
  }

  return (
    <ActionSection
      title={'Delete Event'}
      description={'Permanently delete this event.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Selecting to delete this event, will permenantly remove all sessions and
        laps also associated with this event. This includes data submitted by other
        users of Kart Social!
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmDeletion}>Delete Event</DangerButton>
      </div>

      {/* <!-- Delete Confirmation Modal --> */}
      <DialogModal isOpen={confirmingDeletion} onClose={closeModal}>
        <DialogModal.Content title={'Delete Event'}>
          Are you sure you want to delete this event? Once this event is
          deleted, all of its sessions and laps will be permanently deleted.
          This includes data submitted by other users of Kart Social!
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            onClick={deleteEvent}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Delete Event
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
    </ActionSection>
  );
}
