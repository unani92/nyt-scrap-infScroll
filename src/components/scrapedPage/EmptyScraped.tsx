import clsx from 'clsx';
import { EMPTY_SCRAPDE_ITEM, GO_TO_MAIN } from 'lib/constants';
import { black80, justifyCenter } from 'lib/styles';
import { BookText } from 'lucide-react';
import { Button } from 'components/elements/BottomButton';
import { useNavigate } from 'react-router-dom';

const EmptyScraped = () => {
  const navigate = useNavigate();
  return (
    <div className={clsx(justifyCenter, 'flex-col gap-y-5 h-[calc(100%-87px)] px-10')}>
      <div className={clsx(justifyCenter, 'flex-col gap-y-2 w-full text-center')}>
        <BookText size={36} color={black80} />
        <p className="text-black-100 text-lg font-semibold">{EMPTY_SCRAPDE_ITEM}</p>
      </div>
      <Button label={GO_TO_MAIN} onClick={() => navigate('/')} />
    </div>
  );
};

export default EmptyScraped;
