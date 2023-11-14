import useRoute from '@/Hooks/useRoute';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import TextInput from '../Forms/TextInput';
import AppSearchResults from './AppSearchResults';

let controller: null | AbortController = null;

export default function AppSearch(props: any) {
    const route = useRoute();
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
                .post(route('search'),
                    {
                        term: term,
                    },
                    {
                        signal: controller.signal,
                    })
                .then((json) => {
                    setResults(json.data);
                })
                .catch((error) => {
                    if (error.message !== "canceled") {
                        console.error(error);
                    }
                });
        }
    };

    const onBlur = () => {
        if (!results) {
            setIsFocus(false);
        }
    }

    const inputClasses = classNames(
        (isFocus)
            ? 'absolute z-10 inset-x-80'
            : '',
        (results)
            ? 'rounded-b-none border-b-none border-brand-500 dark:border-brand-600 ring-1 ring-brand-500 dark:ring-brand-600'
            : '',
        'transition-all duration-500'
    )

    return (
        <div className="flex mx-auto items-center">
            <TextInput
                className={inputClasses}
                placeholder="Search..."
                value={term}
                onChange={e => setTerm(e.currentTarget.value)}
                onKeyUp={onKeyUp}
                onFocus={() => setIsFocus(true)}
                onBlur={onBlur}
            />
            {
                isFocus && results
                    ?
                    <div className="absolute z-10 inset-x-80 top-14 -mt-1 py-2 bg-white dark:bg-gray-900 dark:text-gray-300 border border-t-0 border-brand-500 dark:border-brand-600 ring-1 ring-brand-500 dark:ring-brand-600 rounded-b-md shadow-sm">
                        <AppSearchResults results={results} clearResults={() => { setResults(undefined); setTerm('') }} />
                    </div>
                    : null
            }
        </div>
    )
}