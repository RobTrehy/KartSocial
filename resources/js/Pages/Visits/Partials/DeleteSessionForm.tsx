import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

export default function DeleteSessionForm({ visit, session }: any) {
  const route = useRoute();
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const form = useForm();

  function confirmDeletion() {
    setConfirmingDeletion(true);
  }

  function deleteSession() {
    form.delete(route('visits.sessions.destroy', { visit: visit, session: session }), {
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
      title={'Delete Session'}
      description={'Permanently delete this session.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Selecting to delete this session, will permenantly remove all laps also associated with this session.
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmDeletion}>
          Delete Session
        </DangerButton>
      </div>

      {/* <!-- Delete Confirmation Modal --> */}
      <DialogModal isOpen={confirmingDeletion} onClose={closeModal}>
        <DialogModal.Content title={'Delete Session'}>
          Are you sure you want to delete this session? Once this session is
          deleted, all of its laps will be permanently deleted.
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            onClick={deleteSession}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Delete Session
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
    </ActionSection>
  );
}
