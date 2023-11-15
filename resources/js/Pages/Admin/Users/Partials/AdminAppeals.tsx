import DialogModal from '@/Components/DialogModal';
import FeedHeader from '@/Components/Feed/Cards/Partials/FeedHeader';
import InputError from '@/Components/Forms/InputError';
import Select from '@/Components/Forms/Select';
import TextInput from '@/Components/Forms/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import moment from 'moment';
import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';

export default function AdminAppeals({ ban }: any) {
  const [changingExpiry, setChangingExpiry] = useState<boolean>(false);
  const [from, setFrom] = useState<string>('current');
  const [method, setMethod] = useState<string>('add');
  const [count, setCount] = useState<number>(0);
  const [type, setType] = useState<string>('days');
  const [preview, setPreview] = useState(ban.expires_at);

  const route = useRoute();
  const form = useForm({
    ban_id: ban.id,
    appeal: '',
  });

  useEffect(() => {
    let _date = null;
    if (from === 'now') {
      setMethod('add');
      _date = moment();
    } else if (from === 'current') {
      _date = moment(ban.expires_at);
    }

    if (_date && method === 'add') {
      //@ts-ignore
      _date.add(count, type);
    } else if (_date && method === 'remove') {
      //@ts-ignore
      _date.subtract(count, type);
    }
    if (_date) {
      setPreview(_date);
      expiryForm.setData('expires_at', _date.format());
    }
  }, [from, method, count, type]);

  const expiryForm = useForm({
    ban_id: ban.id,
    expires_at: preview,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setData('appeal', e.currentTarget.value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      form.post(route('user.restriction.appeal.add'), {
        preserveScroll: true,
        onSuccess: () => form.reset('appeal'),
      });
    }
  };

  const cancelAppeals = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    axios
      .post(route('admin:user.restriction.appeal.close', { ban: ban.id }))
      .then(res => {
        router.reload();
      });
  };

  const openAppeals = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    axios
      .put(route('admin:user.restriction.appeal.open', { ban: ban.id }))
      .then(res => {
        router.reload();
      });
  };

  const changeExpiry = () => {
    if (moment(preview).isAfter(moment())) {
      expiryForm.post(route('admin:user.restriction.expiry', { ban: ban.id }), {
        preserveScroll: true,
        onSuccess: () => {
          setChangingExpiry(false);
          router.reload();
        },
      });
    } else {
      expiryForm.setError('expires_at', 'Unable to set expiry to a past date.');
    }
  };

  return (
    <div className="last:rounded-b-lg border dark:border-gray-700 w-full overflow-hidden divide-y dark:divide-gray-700">
      {ban.appeals.map((appeal: any, i: number) => (
        <div
          className={classNames(
            'flex',
            'flex-col',
            appeal.user.id === ban.user.id
              ? 'bg-brand-100 dark:bg-gray-700'
              : 'bg-white dark:bg-gray-800',
            'text-gray-800 dark:text-white px-4 md:px-5 pt-4 md:pt-5',
          )}
          key={i}
        >
          <FeedHeader
            user={appeal.user}
            description={<></>}
            time={appeal.updated_at}
          />
          <div className="mb-4">{appeal.appeal}</div>
        </div>
      ))}
      <TextInput
        className="w-full rounded-none border-b-0 border-x-0 border-t focus:ring-0"
        value={form.data.appeal}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Add a comment"
      />
      <div className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 flex flex-row justify-around py-2 px-3 w-full">
        {ban.appeals[ban.appeals.length - 1].allow_reply ? (
          <a href="#" className="text-red-500" onClick={cancelAppeals}>
            Prevent Futher Appeals or Comments
          </a>
        ) : (
          <a href="#" className="text-green-500" onClick={openAppeals}>
            Allow Futher Appeals or Comments
          </a>
        )}

        <a
          href="#"
          className="text-brand-500"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setChangingExpiry(true);
          }}
        >
          Change When Restriction Expires
        </a>
      </div>

      <DialogModal
        isOpen={changingExpiry}
        onClose={() => setChangingExpiry(false)}
      >
        <DialogModal.Content title="Change Restriction Expiry Date">
          <div className="flex flex-wrap items-center gap-x-2 mb-2">
            <p className="py-2 font-semibold">From</p>
            <Select
              name="from"
              value={from}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFrom(e.currentTarget.value);
              }}
            >
              <option value="current">Current Expiry</option>
              <option value="now">Now</option>
            </Select>
            <Select
              name="method"
              value={method}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMethod(e.currentTarget.value);
              }}
            >
              <option value="add">Add</option>
              {from === 'current' && <option value="remove">Remove</option>}
            </Select>
            <Select
              name="count"
              value={count}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCount(+e.currentTarget.value);
              }}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              {(type === 'days' || type === 'months') && (
                <option value="4">4</option>
              )}
              {(type === 'days' || type === 'months') && (
                <option value="5">5</option>
              )}
              {(type === 'days' || type === 'months') && (
                <option value="7">6</option>
              )}
              {type === 'months' && <option value="7">7</option>}
              {type === 'months' && <option value="8">8</option>}
              {type === 'months' && <option value="9">9</option>}
              {type === 'months' && <option value="10">10</option>}
              {type === 'months' && <option value="11">11</option>}
            </Select>
            <Select
              name="type"
              value={type}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setType(e.currentTarget.value);
              }}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </Select>
          </div>
          <p>
            <span className="font-semibold">New Expiry:</span>{' '}
            {moment(preview).format('Do MMMM YYYY')}
          </p>
          <InputError className="mt-2" message={expiryForm.errors.expires_at} />
        </DialogModal.Content>

        <DialogModal.Footer>
          <SecondaryButton onClick={() => setChangingExpiry(false)}>
            Cancel
          </SecondaryButton>

          <PrimaryButton
            className={classNames('ml-2', {
              'opacity-25': expiryForm.processing,
            })}
            onClick={changeExpiry}
            disabled={expiryForm.processing}
          >
            Save
          </PrimaryButton>
        </DialogModal.Footer>
      </DialogModal>
    </div>
  );
}
