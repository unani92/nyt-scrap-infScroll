import { clsx } from 'clsx';
import Badge from '../elements/Badge';
import { black80, blue500, flexCenter } from 'lib/styles';
import { Search, CalendarCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import useStore from 'store/zustand';
import FiltersModal from 'components/FilterModal';

const HomeHeader = ({ open, onToggleModal }: { open: boolean; onToggleModal: (open: boolean) => void }) => {
  const { headline, pubDate, glocations, getGlocationsParsed, getPubDateDot, setFilter } = useStore();
  // const [open, setOpen] = useState(false);
  // const onClick = useCallback((open: boolean) => setOpen(open), []);
  return (
    <>
      <div className={clsx(flexCenter, 'gap-2 flex-wrap', 'bg-white w-full px-5 py-3 border-b border-gray-350')}>
        <Badge
          onClick={() => onToggleModal(true)}
          label={headline || '전체 헤드라인'}
          selected={Boolean(headline)}
          icon={<Search size={16} color={headline ? blue500 : black80} />}
        />
        <Badge
          onClick={() => onToggleModal(true)}
          label={getPubDateDot() || '전체 날짜'}
          selected={Boolean(pubDate)}
          icon={<CalendarCheck size={16} color={pubDate ? blue500 : black80} />}
        />
        <Badge
          onClick={() => onToggleModal(true)}
          label={glocations.length > 0 ? getGlocationsParsed() : '전체 국가'}
          selected={glocations.length > 0}
        />
      </div>
      <FiltersModal
        open={open}
        onClose={() => onToggleModal(false)}
        headlineDefault={headline}
        pubDateDefault={pubDate}
        glocationDefault={glocations}
        setFilter={setFilter}
      />
    </>
  );
};

export default HomeHeader;
