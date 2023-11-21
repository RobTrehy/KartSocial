import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import InputError from '@/Components/Forms/InputError';
import TextInput from '@/Components/Forms/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

interface Props {
  user: User
}

export default function DeleteUserForm({ user }: Props) {
  const route = useRoute();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const form = useForm({
    password: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function confirmUserDeletion() {
    setConfirmingUserDeletion(true);

    setTimeout(() => passwordRef.current?.focus(), 250);
  }

  function deleteUser() {
    form.delete(route('admin:user.admin.destroy.confirmed', { user: user.id }), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingUserDeletion(false);
    form.reset();
  }

  return (
    <ActionSection
      title={'Delete Account'}
      description={'Permanently delete this user.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        <p className="text-2xl text-red-500 font-bold">WARNING!</p>
        <p>This action cannot be undone and should only be taken in extreme circumstances!</p>
        <p>All user data, track visits, sessions and laps will be irrecoverably deleted.</p>
        <p className="font-bold">There is no normal reason to be performing this action!</p>
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmUserDeletion}>
          Delete User
        </DangerButton>
      </div>

      {/* <!-- Delete Account Confirmation Modal --> */}
      <DialogModal isOpen={confirmingUserDeletion} onClose={closeModal}>
        <DialogModal.Content title={'Delete User'}>
          Are you sure you want to delete this account? Once the account is
          deleted, all of its resources and data will be permanently deleted.
          Please enter <span className="font-bold uppercase">your</span> password to confirm you would like to permanently
          delete the account belonging to <span className="font-bold">{user.name} ({user.alias})</span>.
          <div className="mt-4">
            <TextInput
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
            />

            <InputError message={form.errors.password} className="mt-2" />
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            onClick={deleteUser}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Delete Account
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
    </ActionSection>
  );
}
