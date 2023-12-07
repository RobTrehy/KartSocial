import useRoute from '@/Hooks/useRoute';
import axios from 'axios';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import TextInput from '../Forms/TextInput';
import AppSearchResults from './AppSearchResults';

let controller: null | AbortController = null;

interface Props {
  breakpoint: string;
}

export default function AppSearch({ breakpoint }: Props) {
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
          route('search'),
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

  const inputClasses = classNames(
    isFocus ? `absolute z-10 inset-x-0 ${breakpoint}:inset-x-80` : `hidden ${breakpoint}:inline-flex`,
    results
      ? 'rounded-b-none border-b-none border-brand-500 dark:border-brand-600 ring-1 ring-brand-500 dark:ring-brand-600'
      : '',
    'transition-all duration-500',
  );

  return (
    <div className={`flex ml-4 ${breakpoint}:mx-auto items-center`}>
      {
        !isFocus && (
          <div className={`inline-flex ${breakpoint}:hidden text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`} onClick={() => { setIsFocus(true); inputRef.current?.focus() }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        )
      }
      <TextInput
        ref={inputRef}
        className={inputClasses}
        placeholder="Search..."
        value={term}
        onChange={e => setTerm(e.currentTarget.value)}
        onKeyUp={onKeyUp}
        onFocus={() => setIsFocus(true)}
        onBlur={onBlur}
      />
      {isFocus && results ? (
        <div className={`absolute z-10 inset-x-0 ${breakpoint}:inset-x-80 top-14 -mt-1 py-2 bg-white dark:bg-gray-900 dark:text-gray-300 border border-t-0 border-brand-500 dark:border-brand-600 ring-1 ring-brand-500 dark:ring-brand-600 rounded-b-md shadow-sm`}>
          <AppSearchResults
            results={results}
            clearResults={() => {
              setResults(undefined);
              setTerm('');
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
