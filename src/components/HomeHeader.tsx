import { clsx } from 'clsx';
import Badge from './elements/Badge';
import { flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Modal } from './elements/Modal';

const HomeHeader = () => {
  const [open, setOpen] = useState(false);
  const onClick = useCallback((open: boolean) => setOpen(open), []);
  return (
    <>
      <div className={clsx(flexCenter, 'gap-2 flex-wrap', 'bg-white w-full px-5 py-3 border-b border-gray-350')}>
        <Badge onClick={() => onClick(true)} label="전체 헤드라인" icon={<Search size={16} color="#6D6D6D" />} />
        <Badge label="전체 날짜" icon={<CalendarCheck size={16} color="#6D6D6D" />} />
        <Badge label="전체 국가" />
      </div>
      <Modal isOpen={open} onClose={() => onClick(false)}>
        <h1>hello world</h1>
      </Modal>
    </>
  );
};

export default HomeHeader;
