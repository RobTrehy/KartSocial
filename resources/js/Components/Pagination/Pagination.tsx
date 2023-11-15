import { Link } from '@inertiajs/react';
import React from 'react';
import PaginationLinks from './PaginationLinks';

export default function Pagination({ data }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={data.prev_page_url}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          href={data.next_page_url}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-xs text-gray-700 dark:text-gray-400 px-1">
          Showing <span className="font-medium">{data.from}</span> to{' '}
          <span className="font-medium">{data.to}</span> of{' '}
          <span className="font-medium">{data.total}</span> results
        </p>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white"
            aria-label="Pagination"
          >
            <Link
              href={data.prev_page_url}
              className="relative inline-flex items-center rounded-l-md px-3 py-1 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
            <PaginationLinks
              currentPage={data.current_page}
              links={data.links}
            />
            <Link
              href={data.next_page_url}
              className="relative inline-flex items-center rounded-r-md px-3 py-1 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
