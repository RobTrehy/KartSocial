import InputLabel from '@/Components/Forms/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import { sessionLapContext } from '../Sessions/Lap';
import AlphaDataImporter from './AlphaDataImporter';
import AppScreenImporter from './AppScreenImporter';

export default function ImportDataModal({ open, setOpen }: any) {
  const {
    importLaps,
    setImportLaps,
    importReady,
    setImportReady,
    processImport,
  }: any = useContext(sessionLapContext);

  const [processing, setProcessing] = useState<boolean>(false);
  const [dataType, setDataType] = useState<string|null>(null);

  const complete = () => {
    processImport();
    setOpen(false);
  };

  const clickOut = () => {
    setImportReady(false);
    setImportLaps([]);
    setOpen(false);
    setProcessing(false);
    setDataType(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={clickOut}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-full md:my-8 md:w-full md:max-w-3xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
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
                            <ul className="mt-1 grid w-full gap-6 sm:grid-cols-2">
                              <li>
                                <input
                                  type="radio"
                                  id="csv-data"
                                  name="data-type"
                                  value="csv-data"
                                  className="hidden peer"
                                  required
                                  onChange={() => setDataType('alpha-xlsx')}
                                />
                                <label
                                  htmlFor="csv-data"
                                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                  <div className="block">
                                    <div className="w-full text-lg font-semibold">
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
                                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                  <div className="block">
                                    <div className="w-full text-lg font-semibold">
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
                            </ul>
                          </>
                        )}
                        {dataType === 'alpha-xlsx' && (
                          <AlphaDataImporter setProcessing={setProcessing} />
                        )}
                        {dataType === 'app-screens' && (
                          <AppScreenImporter setProcessing={setProcessing} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:gap-x-1.5 items-center">
                  {importReady && (
                    <PrimaryButton onClick={complete}>Import</PrimaryButton>
                  )}
                  <SecondaryButton onClick={clickOut}>Cancel</SecondaryButton>
                  {processing && (
                    <div className="mr-auto italic">Processing Images...</div>
                  )}
                  {!processing && importLaps?.length !== 0 && (
                    <div className="mr-auto italic">
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
