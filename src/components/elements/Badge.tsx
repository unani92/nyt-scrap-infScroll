import clsx from 'clsx';
import { justifyCenter, lineClamp1 } from 'lib/styles';
import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

const Badge = ({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: ReactElement<LucideIcon>;
  selected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={clsx('max-w-[130px] border rounded-lg px-3 py-1', selected ? 'border-blue-500' : 'border-gray-350')}
    >
      <div className={clsx(justifyCenter, 'gap-x-1')}>
        {icon}
        <span
          className={clsx(
            'leading-24 tracking-tighter text-md',
            selected ? 'text-blue-500' : 'text-black-80',
            icon ? 'max-w-[80%] ' : 'max-w-full',
            lineClamp1
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default Badge;
