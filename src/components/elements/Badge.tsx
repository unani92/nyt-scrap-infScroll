import clsx from 'clsx';
import { justifyCenter, lineClamp1 } from 'lib/styles';
import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

const Badge = ({ label, icon, selected }: { label: string; icon?: ReactElement<LucideIcon>; selected?: boolean }) => {
  return (
    <div className={clsx('max-w-[130px] border border-gray-350 rounded-lg px-3 py-1')}>
      <div className={clsx(justifyCenter, 'gap-x-1')}>
        {icon}
        <span
          className={clsx(
            'text-black-80 leading-24 tracking-tighter text-md',
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
