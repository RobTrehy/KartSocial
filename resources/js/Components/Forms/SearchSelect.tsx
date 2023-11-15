import React from 'react';
import Select from 'react-tailwindcss-select';

export default function SearchSelect(props: any) {

    return (
        <Select
            value={props.value}
            onChange={value => { props.onChange(value) }}
            options={props.options}
            primaryColor='brand'
            classNames={{
                menuButton: ({ isDisabled }) => (
                    `flex border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md transition-all duration-300 focus:outline-none ${isDisabled
                        ? "bg-gray-200 dark:bg-gray-700"
                        : "focus:border-brand-500 dark:focus:border-brand-600 focus:ring-brand-500 dark:focus:ring-brand-600"
                    }`
                ),
                menu: "absolute z-10 w-full bg-white dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded py-1 mt-1.5 text-sm text-gray-700 dark:text-gray-300",
                listItem: ({ isSelected }) => (
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                        ? `text-white bg-brand-500 dark:bg-brand-600`
                        : `text-gray-500 hover:bg-brand-100 dark:hover:bg-brand-900 hover:text-brand-500 dark:hover:text-white`
                    }`
                ),
                searchBox: "w-full pl-8 text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md"
            }}
            {...props}
        />
    )
}