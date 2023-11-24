import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface RoundedButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

const BottomButton = ({ className, label, ...props }: RoundedButtonProps) => {
  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto max-h-3/4 w-full max-w-screen-md">
      <div className="white-gradient h-6 w-full" />
      <div className="bg-white p-5 rounded-md">
        <button
          className={clsx(
            'relative flex w-full items-center justify-center rounded-xl bg-blue-500 p-4 font-bold tracking-wide text-white hover:opacity-90',
            className,
            'bg-blue-500'
          )}
          {...props}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default BottomButton;
