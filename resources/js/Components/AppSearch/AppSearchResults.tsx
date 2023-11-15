import classNames from 'classnames';
import React, { useState } from 'react';
import ResultItemPerson from './ResultItems/ResultItemPerson';
import ResultItemTrack from './ResultItems/ResultItemTrack';

export default function AppSearchResults({ results, clearResults }: any) {
  const [selected, setSelected] = useState<Number>(0);

  const tabClass = (i: number) =>
    classNames(
      'border-b-2',
      selected === i ? 'border-brand-600' : 'border-transparent',
      selected === i ? 'text-brand-600' : 'hover:text-brand-600',
      'py-2',
      'px-2',
      'cursor-pointer',
      'transition-all',
      'duration-500',
    );

  return (
    <div className="flex flex-col divide-y dark:divide-gray-600">
      <div className="flex flex-row items-center gap-x-4 px-3">
        <div className={tabClass(0)} onClick={() => setSelected(0)}>
          All
        </div>
        <div className={tabClass(1)} onClick={() => setSelected(1)}>
          Tracks
        </div>
        <div className={tabClass(2)} onClick={() => setSelected(2)}>
          People
        </div>
        <div
          className="text-xs ml-auto cursor-pointer hover:text-brand-600 mb-2"
          onClick={clearResults}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="sr-only">Clear Search</div>
        </div>
      </div>
      {selected === 0 &&
        results?.all &&
        results.all.map((result: any, i: number) => {
          if (result.email) {
            return <ResultItemPerson result={result} key={i} />;
          } else {
            return <ResultItemTrack result={result} key={i} />;
          }
        })}
      {selected === 1 &&
        results?.tracks &&
        results.tracks.map((result: any, i: number) => {
          return <ResultItemTrack result={result} key={i} />;
        })}
      {selected === 2 &&
        results?.people &&
        results.people.map((result: any, i: number) => {
          return <ResultItemPerson result={result} key={i} />;
        })}
    </div>
  );
}
