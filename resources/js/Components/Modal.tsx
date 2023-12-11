import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose(): void;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  maxWidth = '2xl',
  children,
}: PropsWithChildren<ModalProps>) {
  const maxWidthClass = {
    sm: 'md:max-w-sm',
    md: 'md:max-w-md',
    lg: 'md:max-w-lg',
    xl: 'md:max-w-xl',
    '2xl': 'md:max-w-2xl',
  }[maxWidth];

  if (typeof window === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-[500] inset-0 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center md:block md:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div
              className={classNames(
                'inline-block align-bottom bg-white dark:bg-gray-800 rounded-md text-left overflow-hidden shadow-xl transform transition-all md:my-8 md:align-middle md:w-full',
                maxWidthClass,
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>,
    document.body,
  );
}
