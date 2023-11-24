import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';

export const Modal = ({
  className,
  isOpen,
  onClose,
  children,
}: {
  className?: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children: React.ReactNode;
}) => {
  const focusRef = useRef(null);

  return (
    <Transition show={isOpen}>
      <Dialog
        initialFocus={focusRef}
        onClose={onClose}
        className="z-10 fixed inset-0 overflow-y-auto w-full max-w-[560px] m-auto"
      >
        <div className="min-h-screen flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={clsx('fixed inset-0 bg-black-100 opacity-[50%]')} />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                className,
                'overflow-visible w-full max-w-[90%] max-h-[70vh] text-left transition-all transform bg-white rounded-md p-5'
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
