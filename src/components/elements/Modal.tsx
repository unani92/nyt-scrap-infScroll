import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { Fragment, useEffect, useRef } from 'react';

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
        className="z-10 fixed inset-0 overflow-y-auto w-full max-w-[560px] min-w-[375px] m-auto"
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
            <Dialog.Panel
              ref={focusRef}
              className={clsx(
                className,
                'overflow-visible w-full max-w-[90%] max-h-[70vh] text-left transition-all transform bg-white rounded-md p-5'
              )}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export const Snackbar = ({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string | React.ReactNode;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && !timerRef.current) {
      timerRef.current = setTimeout(() => {
        if (isOpen) {
          onClose();
        }
      }, 2000);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current!);
        timerRef.current = null;
      }
    }
  }, [isOpen]);

  return (
    <Transition
      show={isOpen}
      as="div"
      className="fixed top-5 left-[50%] translate-x-[-50%] z-50 rounded bg-gray-800 p-4 w-[calc(100%-40px)] max-w-[520px]"
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="flex flex-row items-center space-x-2">
        <Check color="green" size={16} />
        <div className="flex flex-row text-sm font-bold text-white">{message}</div>
      </div>
    </Transition>
  );
};
