import clsx from 'clsx';
import { justifyCenter } from 'lib/styles';
import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

const Badge = ({ label, icon, selected }: { label: string; icon?: ReactElement<LucideIcon>; selected?: boolean }) => {
  return (
    <div className={clsx('max-w-[130px] border border-gray-350 rounded-lg px-3 py-1')}>
      <div className={clsx(justifyCenter, 'gap-x-1')}>
        {icon}
        <span className="text-black-80 leading-24 tracking-tighter text-md">{label}</span>
      </div>
    </div>
  );
};

export default Badge;
