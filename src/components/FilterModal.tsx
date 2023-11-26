import { parseISO, format } from 'date-fns';
import { Glocation } from 'lib/types';
import { ReactNode, useCallback, useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { debounce } from 'ts-debounce';
import { Modal } from './elements/Modal';
import InputDefault, { InputCalendar } from './elements/Input';
import SelectButtons from './elements/SelectButtons';
import { GLOCATION_ITEMS } from 'lib/constants';
import BottomButton from './elements/BottomButton';
import { FilterState } from 'store/zustand/filterStore';

function FiltersModal({
  open,
  onClose,
  headlineDefault,
  pubDateDefault,
  glocationDefault,
  setFilter,
}: {
  open: boolean;
  onClose: () => void;
  headlineDefault?: string;
  pubDateDefault?: string;
  glocationDefault: Glocation[];
  setFilter: (value: FilterState) => void;
}) {
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
          defaultValue={headline}
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

export default FiltersModal;
