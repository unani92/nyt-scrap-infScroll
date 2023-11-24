import clsx from 'clsx';
import { debounce } from 'ts-debounce';
import { CalendarCheck } from 'lucide-react';
import { justifyBetween } from 'lib/styles';
import { format } from 'date-fns';
import { HTMLAttributes, useCallback, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';

const inputContainerStyle = 'w-full border rounded-sm px-5 h-10 text-md text-md leading-24 tight-m56';
interface RoundedButtonProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputDefault = ({ className, ...props }: RoundedButtonProps) => {
  return <input {...props} className={clsx(inputContainerStyle)} />;
};

export const InputCalendar = ({
  date,
  placeholder = '날짜를 선택해주세요.',
  onChangeDate,
}: {
  date?: Value;
  placeholder?: string;
  onChangeDate: (date: Value) => void;
}) => {
  const [showCalendar, setCalendar] = useState(false);
  const toggleCalendar = useCallback((val: boolean) => {
    setCalendar(!val);
  }, []);
  const _onChange = useCallback((value: Value) => {
    if (value) {
      onChangeDate(value);
      setCalendar(false);
    }
  }, []);
  return (
    <div className="relative">
      <div onClick={() => toggleCalendar(showCalendar)} className={clsx(inputContainerStyle, justifyBetween)}>
        <span className={clsx(!date && 'text-gray-350')}>
          {date ? format(date as Date, 'yyyy.MM.dd') : placeholder}
        </span>
        <CalendarCheck size={16} color="#6D6D6D" />
      </div>
      {showCalendar && (
        <Calendar className="absolute z-50 left-0" formatDay={(_, date) => format(date, 'd')} onChange={_onChange} />
      )}
    </div>
  );
};

export default InputDefault;
