import { clsx } from 'clsx';
import Badge from './elements/Badge';
import { flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';
import React, { ReactNode, useCallback, useState } from 'react';
import { Modal } from './elements/Modal';
import InputDefault, { InputCalendar } from './elements/Input';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import SelectButtons from './elements/SelectButtons';
import { GLOCATION_ITEMS } from 'lib/constants';
import { Glocation } from 'lib/types';
import BottomButton from './elements/BottomButton';
import useStore, { FilterState } from 'store/zustlandStore';
import { format, parseISO } from 'date-fns';
import { debounce } from 'ts-debounce';

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
  const { setFilter, headline: headlineDefault, pubDate: pubDateDefault, glocation: glocationDefault } = useStore();
  // const _onChange = debounce(e => {
  //   const val = e.target.value as string;
  //   onChange(val);
  // }, 500);
  const [headline, setHeadline] = useState(headlineDefault);
  const onChangeHeadline = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value as string;
      setHeadline(val);
    }, 500),
    []
  );

  const [pubDate, setDate] = useState<Value | undefined>(pubDateDefault ? parseISO(pubDateDefault) : undefined);
  const onChangeDate = useCallback((date: Value) => date && setDate(date), []);

  const [glocation, setGlocation] = useState<Glocation | undefined>(glocationDefault);
  const onChangeGlocation = useCallback((value: Glocation) => {
    setGlocation(value);
  }, []);

  const onClickBottomButton = useCallback(
    ({ headline, pubDate, glocation }: { headline?: string; pubDate?: Date; glocation?: Glocation }) => {
      setFilter({ headline, pubDate: pubDate ? format(pubDate as Date, 'yyyy-MM-dd') : undefined, glocation });
      onClose();
    },
    []
  );
  return (
    <Modal className="min-h-[500px]" isOpen={open} onClose={onClose}>
      <FilterContainer label="헤드라인">
        <InputDefault
          defaultValue={headlineDefault}
          onChange={onChangeHeadline}
          placeholder="검색하실 헤드라인을 입력해주세요."
        />
      </FilterContainer>
      <FilterContainer label="날짜">
        <InputCalendar date={pubDate} onChangeDate={onChangeDate} />
      </FilterContainer>
      <FilterContainer label="국가">
        <SelectButtons value={glocation} options={GLOCATION_ITEMS} onClick={onChangeGlocation} />
      </FilterContainer>
      <BottomButton
        onClick={() => onClickBottomButton({ headline, pubDate: pubDate as Date, glocation })}
        label="필터 적용하기"
      />
    </Modal>
  );
}

function FilterContainer({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="pb-10">
      <div className="text-large font-bold leading-24 tracking-m8 mb-2">{label}</div>
      {children}
    </div>
  );
}

export default HomeHeader;
