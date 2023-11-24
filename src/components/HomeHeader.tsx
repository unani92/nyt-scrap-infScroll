import { clsx } from 'clsx';
import Badge from './elements/Badge';
import { flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Modal } from './elements/Modal';
import InputDefault from './elements/Input';

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
      <FilterModal open={open} onClose={() => onClick(false)} />
    </>
  );
};

function FilterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [headline, setHeadline] = useState('');
  const onChangeHeadline = useCallback((value: string) => setHeadline(value), []);
  return (
    <Modal isOpen={open} onClose={onClose}>
      <Label label="헤드라인" />
      <InputDefault onChange={val => onChangeHeadline(val as string)} placeholder="검색하실 헤드라인을 입력해주세요." />
    </Modal>
  );
}

function Label({ label }: { label: string }) {
  return <div className="text-large font-bold leading-24 tracking-m8 mb-2">{label}</div>;
}

export default HomeHeader;
