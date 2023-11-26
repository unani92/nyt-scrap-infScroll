import { clsx } from 'clsx';
import Badge from './elements/Badge';
import { black80, blue500, flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';
import React, { ReactNode, useCallback, useState } from 'react';
import { Modal } from './elements/Modal';
import InputDefault, { InputCalendar } from './elements/Input';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import SelectButtons from './elements/SelectButtons';
import { GLOCATION_ITEMS } from 'lib/constants';
import { Glocation } from 'lib/types';
import BottomButton from './elements/BottomButton';
import useStore from 'store/zustand';
import { format, parseISO } from 'date-fns';
import { debounce } from 'ts-debounce';

const HomeHeader = () => {
  const { headline, pubDate, glocations, getGlocationsParsed, getPubDateDot } = useStore();
  const [open, setOpen] = useState(false);
  const onClick = useCallback((open: boolean) => setOpen(open), []);
  return (
    <>
      <div className={clsx(flexCenter, 'gap-2 flex-wrap', 'bg-white w-full px-5 py-3 border-b border-gray-350')}>
        <Badge
          onClick={() => onClick(true)}
          label={headline || '전체 헤드라인'}
          selected={Boolean(headline)}
          icon={<Search size={16} color={headline ? blue500 : black80} />}
        />
        <Badge
          onClick={() => onClick(true)}
          label={getPubDateDot() || '전체 날짜'}
          selected={Boolean(pubDate)}
          icon={<CalendarCheck size={16} color={pubDate ? blue500 : black80} />}
        />
        <Badge
          onClick={() => onClick(true)}
          label={glocations.length > 0 ? getGlocationsParsed() : '전체 국가'}
          selected={glocations.length > 0}
        />
      </div>
      <FiltersModal open={open} onClose={() => onClick(false)} />
    </>
  );
};

function FiltersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setFilter, headline: headlineDefault, pubDate: pubDateDefault, glocations: glocationDefault } = useStore();

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

  const [glocations, setGlocations] = useState<Glocation[]>(glocationDefault);
  const onChangeGlocation = useCallback(
    (value: Glocation) => {
      setGlocations(
        glocations.some(gItems => gItems === value)
          ? glocations.filter(gItem => gItem !== value)
          : [...glocations, value]
      );
    },
    [glocations]
  );

  const onClickBottomButton = useCallback(
    ({ headline, pubDate, glocations }: { headline?: string; pubDate?: Date; glocations: Glocation[] }) => {
      setFilter({
        headline,
        pubDate: pubDate ? format(pubDate as Date, 'yyyy-MM-dd') : undefined,
        glocations,
      });
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
        <SelectButtons value={glocations} options={GLOCATION_ITEMS} onClick={onChangeGlocation} />
      </FilterContainer>
      <BottomButton
        onClick={() => onClickBottomButton({ headline, pubDate: pubDate as Date, glocations })}
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
