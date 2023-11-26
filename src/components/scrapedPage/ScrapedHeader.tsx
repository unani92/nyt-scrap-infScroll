import { useCallback, useState } from 'react';
import useStore from 'store/zustand';
import Badge from 'components/elements/Badge';
import { black80, blue500, flexCenter } from 'lib/styles';
import clsx from 'clsx';
import { CalendarCheck, Search } from 'lucide-react';

const ScrapedHeader = () => {
  const { scrapedHeadline, scrapedPubDate, scrapedGlocations, getScrapedGlocationsParsed, getScrapedPubDateDot } =
    useStore();
  const [open, setOpen] = useState(false);
  const onClick = useCallback((open: boolean) => setOpen(open), []);
  return (
    <>
      <div className={clsx(flexCenter, 'gap-2 flex-wrap', 'bg-white w-full px-5 py-3 border-b border-gray-350')}>
        <Badge
          onClick={() => onClick(true)}
          label={scrapedHeadline || '전체 헤드라인'}
          selected={Boolean(scrapedHeadline)}
          icon={<Search size={16} color={scrapedHeadline ? blue500 : black80} />}
        />
        <Badge
          onClick={() => onClick(true)}
          label={getScrapedPubDateDot() || '전체 날짜'}
          selected={Boolean(scrapedPubDate)}
          icon={<CalendarCheck size={16} color={scrapedPubDate ? blue500 : black80} />}
        />
        <Badge
          onClick={() => onClick(true)}
          label={scrapedGlocations.length > 0 ? getScrapedGlocationsParsed() : '전체 국가'}
          selected={scrapedGlocations.length > 0}
        />
      </div>
    </>
  );
};

export default ScrapedHeader;
