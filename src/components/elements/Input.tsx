import clsx from 'clsx';
import { debounce } from 'ts-debounce';

const InputDefault = ({
  onChange,
  placeholder,
}: {
  onChange: (value: string | number) => void;
  placeholder?: string;
}) => {
  const _onChange = debounce(e => {
    const val = e.target.value as string;
    onChange(val);
  }, 500);
  return (
    <input className="w-full border rounded-sm px-2 h-10" placeholder={placeholder} onChange={e => _onChange(e)} />
  );
};

export default InputDefault;
