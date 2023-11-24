import { clsx } from 'clsx';
import Badge from './elements/Badge';
import { flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';
import { ReactNode, useCallback, useState } from 'react';
import { Modal } from './elements/Modal';
import InputDefault, { InputCalendar } from './elements/Input';
import { Value } from 'react-calendar/dist/cjs/shared/types';

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
      <FiltersModal open={open} onClose={() => onClick(false)} />
    </>
  );
};

function FiltersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [headline, setHeadline] = useState('');
  const onChangeHeadline = useCallback((value: string) => setHeadline(value), []);
  const [date, setDate] = useState<Value>();
  const onChangeDate = useCallback((date: Value) => date && setDate(date), []);
  return (
    <Modal isOpen={open} onClose={onClose}>
      <FilterContainer label="헤드라인">
        <InputDefault
          onChange={val => onChangeHeadline(val as string)}
          placeholder="검색하실 헤드라인을 입력해주세요."
        />
      </FilterContainer>
      <FilterContainer label="날짜">
        <InputCalendar date={date} onChangeDate={onChangeDate} />
      </FilterContainer>
    </Modal>
  );
}

function FilterContainer({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <div className="text-large font-bold leading-24 tracking-m8 mb-2">{label}</div>
      {children}
    </div>
  );
}

export default HomeHeader;
