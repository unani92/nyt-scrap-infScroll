import clsx from 'clsx';
import { CalendarCheck, X } from 'lucide-react';
import { black80, flexCenter, justifyBetween } from 'lib/styles';
import { format } from 'date-fns';
import { HTMLAttributes, useCallback, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';

const inputContainerStyle = 'w-full border rounded-sm px-5 h-10 text-md text-md leading-24 tight-m56';
interface RoundedButtonProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  removeValue?: () => void;
}

const InputDefault = ({ className, removeValue, ...props }: RoundedButtonProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  }, []);
  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur && props.onBlur(e);
  }, []);
  return (
    <div className={clsx(inputContainerStyle, justifyBetween, isFocused && 'ring-2 ring-blue-500', className)}>
      <input ref={ref} {...props} onFocus={onFocus} onBlur={onBlur} className={clsx('h-full w-[90%]')} />
      {removeValue && ref.current?.value && (
        <button
          onClick={e => {
            e.stopPropagation();
            if (ref.current) {
              ref.current.value = '';
              removeValue();
            }
          }}
        >
          <X size={16} color={black80} />
        </button>
      )}
    </div>
  );
};

export const InputCalendar = ({
  date,
  placeholder = '날짜를 선택해주세요.',
  onChangeDate,
}: {
  date?: Value;
  placeholder?: string;
  onChangeDate: (date?: Value) => void;
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
      <div
        onClick={() => toggleCalendar(showCalendar)}
        className={clsx(inputContainerStyle, justifyBetween, showCalendar && 'ring-2 ring-blue-500')}
      >
        <div className={clsx(flexCenter, 'gap-x-2')}>
          <CalendarCheck size={16} color={black80} />
          <span className={clsx(!date && 'text-gray-350')}>
            {date ? format(date as Date, 'yyyy.MM.dd') : placeholder}
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            onChangeDate();
          }}
          className={clsx(Boolean(date) === false && 'hidden')}
        >
          <X size={16} color={black80} />
        </button>
      </div>
      {showCalendar && (
        <Calendar
          className="absolute z-50 left-0 top-[44px]"
          formatDay={(_, date) => format(date, 'd')}
          onChange={_onChange}
        />
      )}
    </div>
  );
};

export default InputDefault;
