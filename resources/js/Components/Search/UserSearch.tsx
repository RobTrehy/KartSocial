import useRoute from '@/Hooks/useRoute';
import axios from 'axios';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import TextInput from '../Forms/TextInput';

let controller: null | AbortController = null;

export default function UserSearch({ inputClasses, onResultClick }: any) {
  const route = useRoute();
  const inputRef = useRef(null);
  const [term, setTerm] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [results, setResults] = useState<Array<Object> | undefined>();

  const onKeyUp = async () => {
    if (term === '') {
      setResults(undefined);
    }

    if (controller !== null) {
      controller.abort();
    }

    if (term.length > 1) {
      controller = new AbortController();
      await axios
        .post(
          route('users.search'),
          {
            term: term,
          },
          {
            signal: controller.signal,
          },
        )
        .then(json => {
          setResults(json.data);
        })
        .catch(error => {
          if (error.message !== 'canceled') {
            console.error(error);
          }
        });
    }
  };

  const onBlur = () => {
    if (!results) {
      setIsFocus(false);
    }
  };

  const inputClassesCalculated = classNames(
    results
      ? 'rounded-b-none border-brand-500 dark:border-brand-600 ring-1 ring-brand-500 dark:ring-brand-600'
      : '',
    'flex transition-all duration-500 w-full',
    inputClasses,
  );

  return (
    <div className={`flex mx-auto items-center`}>
      <TextInput
        ref={inputRef}
        className={inputClassesCalculated}
        placeholder="Search..."
        value={term}
        onChange={e => setTerm(e.currentTarget.value)}
        onKeyUp={onKeyUp}
        onFocus={() => setIsFocus(true)}
        onBlur={onBlur}
      />
      {isFocus && results ? (
        <div className={`absolute z-50 inset-x-0 top-12 -mt-1 py-2 bg-white dark:bg-gray-900 dark:text-gray-300 border border-t-0 border-brand-500 dark:border-brand-600 ring-1 ring-brand-500 dark:ring-brand-600 rounded-b-md shadow-sm`}>
          <div className="flex flex-col divide-y dark:divide-gray-600">
            {
              results?.people &&
              results.people.map((result: any, i: number) => (
                <div key={i}
                  onClick={() => onResultClick(result)}
                  className="py-2 px-3 group hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex flex-row gap-x-4 items-center"
                >
                  <img
                    src={result.profile_photo_url}
                    className="w-10 h-10 rounded-md"
                    alt={result.alias}
                  />
                  <div className="font-semibold group-hover:text-brand-500">{result.alias}</div>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
