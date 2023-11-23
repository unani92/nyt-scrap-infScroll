import { clsx } from 'clsx';
import Badge from './elements/Badge';
import { flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';

const HomeHeader = () => {
  return (
    <div className={clsx(flexCenter, 'gap-2 flex-wrap', 'bg-white w-full px-5 py-3 border-b border-gray-350')}>
      <Badge label="전체 헤드라인" icon={<Search size={16} color="#6D6D6D" />} />
      <Badge label="전체 날짜" icon={<CalendarCheck size={16} color="#6D6D6D" />} />
      <Badge label="전체 국가" />
    </div>
  );
};

export default HomeHeader;
