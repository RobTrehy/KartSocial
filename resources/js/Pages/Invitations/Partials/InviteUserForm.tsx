import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { Link, useForm, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

interface Props {
  invited: Array<any>,
}

export default function InviteUserForm({ invited }: Props) {
  const page = usePage();
  const route = useRoute();

  const form = useForm({
    _method: 'POST',
    email: '',
    invited_by: page.props.auth.user.id,
  });

  function sendInvite() {
    form.post(route('user-invitations.invite'), {
      errorBag: 'invitations',
    });
  }

  return (
    <FormSection
      onSubmit={sendInvite}
      title={'Invitational'}
      description={`We are currently running in a private alpha. You have an allocation of invites available to you - use them wisely!`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Invite Sent!
          </ActionMessage>
          {
            (page.props.auth.user.invited_count < page.props.max_invites) && (
              <PrimaryButton
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                Invite
              </PrimaryButton>
            )
          }
        </>
      )}
    >

      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="email" value={`We currently allow each user to send a maximum of ${page.props.max_invites} invites.`} />
        <div className="mt-1 block bg-gray-200 text-gray-900 w-full rounded-full text-xs leading-none h-[16px] text-center relative mb-0.5">
          <div className="absolute z-20 w-full pt-0.5">{page.props.auth.user.invited_count}/{page.props.max_invites}</div>
          <div
            className="absolute z-10 bg-blue-500 rounded-full text-xs leading-none h-[16px] text-center"
            style={{ width: `${(page.props.auth.user.invited_count / page.props.max_invites) * 100}%` }}
          />
        </div>
      </div>

      {/* <!-- Email --> */}
      {
        (page.props.auth.user.invited_count < page.props.max_invites) && (
          <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="email" value="Email Address to invite" />
            <TextInput
              id="email"
              type="text"
              className="mt-1 block w-full"
              value={form.data.email}
              onChange={e => form.setData('email', e.currentTarget.value)}
            />
            <InputError message={form.errors.email} className="mt-2" />
          </div>
        )
      }

      {
        (page.props.auth.user.invited_count == page.props.max_invites) && (
          <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="email" value="You have used all your invites! Please check back later." />
          </div>
        )
      }

      {
        page.props.auth.user.invited_count > 0 && (
          <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="email" value="You have previously invited:" />
            <ul className="list-disc mx-8 text-sm">
              {
                invited.map((invite: any, i: number) => {
                  if (!invite.registered_at) {
                    return <li key={i}>{invite.email} (Pending)</li>
                  } else {
                    return (
                      <li className="hover:text-brand-600" key={i}>
                        <Link href={route('profile.show', {alias: invite.became.alias})}>
                          {invite.email} (Accepted invite. Registered as: {invite.became.alias})
                        </Link>
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
        )
      }
    </FormSection>
  );
}
