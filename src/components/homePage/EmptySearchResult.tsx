import clsx from 'clsx';
import { EMPTY_SEARCH_RESULT, CHANGE_SEARCH_FILTER } from 'lib/constants';
import { black80, justifyCenter } from 'lib/styles';
import { BookText } from 'lucide-react';
import { Button } from 'components/elements/BottomButton';

const EmptySearchResult = ({ emptySearchResultHandler }: { emptySearchResultHandler?: () => void }) => {
  return (
    <div className={clsx(justifyCenter, 'flex-col gap-y-5 h-[calc(100%-87px)] px-10')}>
      <div className={clsx(justifyCenter, 'flex-col gap-y-2 w-full text-center')}>
        <BookText size={36} color={black80} />
        <p className="text-black-100 text-lg font-semibold">{EMPTY_SEARCH_RESULT}</p>
      </div>
      {emptySearchResultHandler && <Button label={CHANGE_SEARCH_FILTER} onClick={() => emptySearchResultHandler()} />}
    </div>
  );
};

export default EmptySearchResult;
