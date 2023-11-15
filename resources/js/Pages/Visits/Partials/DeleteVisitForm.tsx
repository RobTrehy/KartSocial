import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

export default function DeleteVisitForm({ id }: any) {
  const route = useRoute();
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const form = useForm();

  function confirmDeletion() {
    setConfirmingDeletion(true);
  }

  function deleteVisit() {
    form.delete(route('visits.destroy', { visit: id }), {
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
      title={'Delete Visit'}
      description={'Permanently delete this visit.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Selecting to delete this visit, will permenantly remove all sessions and
        laps also associated with this visit.
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmDeletion}>Delete Visit</DangerButton>
      </div>

      {/* <!-- Delete Confirmation Modal --> */}
      <DialogModal isOpen={confirmingDeletion} onClose={closeModal}>
        <DialogModal.Content title={'Delete Visit'}>
          Are you sure you want to delete this visit? Once this visit is
          deleted, all of its sessions and laps will be permanently deleted.
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            onClick={deleteVisit}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Delete Visit
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
    </ActionSection>
  );
}
