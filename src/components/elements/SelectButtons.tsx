import clsx from 'clsx';
import { flexCenter, lineClamp1 } from 'lib/styles';
import { ValueLabel } from 'lib/types';
import { HTMLAttributes } from 'react';

interface RoundedButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  selected: boolean;
}

const SelectButtons = <T,>({
  value,
  options,
  onClick,
}: {
  value?: T | T[];
  options: ValueLabel<T>[];
  onClick: (value: T) => void;
}) => {
  const isArray = Array.isArray(value);
  return (
    <div className={clsx(flexCenter, 'flex-wrap gap-2')}>
      {options.map(option => (
        <RoundedButton
          onClick={() => onClick(option.value)}
          label={option.label}
          selected={isArray ? value.includes(option.value) : value === option.value}
          key={String(option.value)}
        />
      ))}
    </div>
  );
};

function RoundedButton({ label, selected, ...props }: RoundedButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg px-3 py-1.5 text-md max-w-[130px]',
        selected
          ? 'bg-skyblue-500 border-skyblue-500 opacity-[50%] text-white'
          : 'text-black-80 border border-gray-100',
        lineClamp1
      )}
      {...props}
    >
      {label}
    </button>
  );
}

export default SelectButtons;
