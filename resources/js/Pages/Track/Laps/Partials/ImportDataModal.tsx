import InputLabel from '@/Components/Forms/InputLabel';
import Select from '@/Components/Forms/Select';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { TrackSession } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import { sessionLapContext } from '../Edit';
import AlphaDataImporter from './AlphaDataImporter';
import AppScreenImporter from './AppScreenImporter';
import RaceChronoDataImporter from './RaceChronoDataImporter';

export default function ImportDataModal({ open, setOpen, event }: any) {
  const {
    importLaps,
    setImportLaps,
    importReady,
    setImportReady,
    importSession,
    setImportSession,
    processImport,
  }: any = useContext(sessionLapContext);

  const [processing, setProcessing] = useState<boolean>(false);
  const [dataType, setDataType] = useState<string | null>(null);

  const complete = () => {
    processImport();
    clickOut();
  };

  const clickOut = () => {
    setImportReady(false);
    setImportLaps([]);
    setOpen(false);
    setImportSession(event.sessions[0].id);
    setProcessing(false);
    setDataType(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[500]" onClose={clickOut}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white dark:bg-gray-900 text-left shadow-xl transition-all w-full max-w-full md:my-8 md:w-full md:max-w-4xl">
                <div className="px-4 pb-4 pt-5 md:p-6 md:pb-4">
                  <div className="md:flex md:items-start">
                    <div className="mt-3 text-center md:ml-4 md:mt-0 md:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                      >
                        Import Data
                      </Dialog.Title>
                      <div className="mt-2">
                        {!dataType && (
                          <>
                            <InputLabel
                              htmlFor=""
                              value="Select the type of data you wish to import"
                            />
                            <ul className="mt-1 grid w-full gap-4 md:grid-cols-3">
                              <li>
                                <input
                                  type="radio"
                                  id="alpha-data"
                                  name="data-type"
                                  value="alpha-data"
                                  className="hidden peer"
                                  required
                                  onChange={() => setDataType('alpha-xlsx')}
                                />
                                <label
                                  htmlFor="alpha-data"
                                  className="inline-flex items-center justify-between w-full p-6 text-gray-500 bg-white border border-gray-200 rounded-md cursor-pointer dark:border-gray-700 dark:hover:text-brand-500 hover:border-brand-600 dark:hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-brand-900"
                                >
                                  <div className="block">
                                    <div className="w-full text-md font-semibold">
                                      Alpha Timing XLSX File
                                    </div>
                                  </div>
                                  <svg
                                    className="w-5 h-5 ml-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                  </svg>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  id="app-screens"
                                  name="data-type"
                                  value="app-screens"
                                  className="hidden peer"
                                  onChange={() => setDataType('app-screens')}
                                />
                                <label
                                  htmlFor="app-screens"
                                  className="inline-flex items-center justify-between w-full p-6 text-gray-500 bg-white border border-gray-200 rounded-md cursor-pointer dark:border-gray-700 dark:hover:text-brand-500 hover:border-brand-600 dark:hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-brand-900"
                                >
                                  <div className="block">
                                    <div className="w-full text-md font-semibold">
                                      App Screenshots
                                    </div>
                                  </div>
                                  <svg
                                    className="w-5 h-5 ml-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                  </svg>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  id="racechrono-data"
                                  name="data-type"
                                  value="racechrono-data"
                                  className="hidden peer"
                                  required
                                  onChange={() => setDataType('racechrono')}
                                />
                                <label
                                  htmlFor="racechrono-data"
                                  className="inline-flex items-center justify-between w-full p-6 text-gray-500 bg-white border border-gray-200 rounded-md cursor-pointer dark:border-gray-700 dark:hover:text-brand-500 hover:border-brand-600 dark:hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-brand-900"
                                >
                                  <div className="block">
                                    <div className="w-full text-md font-semibold">
                                      Race Chrono ODS File
                                    </div>
                                  </div>
                                  <svg
                                    className="w-5 h-5 ml-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                  </svg>
                                </label>
                              </li>
                            </ul>
                          </>
                        )}
                        {dataType === 'alpha-xlsx' && <AlphaDataImporter setProcessing={setProcessing} />}
                        {dataType === 'app-screens' && <AppScreenImporter setProcessing={setProcessing} />}
                        {dataType === 'racechrono' && <RaceChronoDataImporter setProcessing={setProcessing} />}
                      </div>
                      {
                        importReady && (
                          <div className="mt-2">
                            <InputLabel htmlFor="import_session" value="Session to import to" />
                            <Select
                              id="import_session"
                              name="import_session"
                              value={importSession}
                              onChange={e => setImportSession(e.currentTarget.value)}
                            >
                              {event.sessions.length > 0 && event.sessions.map((session: TrackSession, i: number) => (
                                <option key={i} value={session.id}>{session.name}</option>
                              ))}
                            </Select>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 md:flex md:flex-row-reverse md:px-6 md:gap-x-1.5 items-center">
                  {importReady && <PrimaryButton onClick={complete}>Import</PrimaryButton>}
                  <SecondaryButton onClick={clickOut}>Cancel</SecondaryButton>
                  {processing && <div className="mr-auto italic">Processing Images...</div>}
                  {!processing && importLaps?.length !== 0 && (
                    <div className="mr-auto italic dark:text-gray-300">
                      {importLaps.length} laps detected
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
