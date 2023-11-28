import clsx from 'clsx';
import { parseISO, format } from 'date-fns';
import { black80, flexCenter, justifyBetween } from 'lib/styles';
import { Doc, ScrapedDoc } from 'lib/types';
import { Star } from 'lucide-react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useStore from 'store/zustand';
import { ko } from 'date-fns/locale';

export default function ArticleItem({
  docItem,
  onClickStar,
}: {
  docItem: Doc | ScrapedDoc;
  onClickStar: (scraped: boolean) => void;
}) {
  const { scrapedDocs, setToggleDocs } = useStore();
  const scraped = scrapedDocs.some(scrapedDocs => scrapedDocs.web_url === docItem.web_url);
  const _onClickStar = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClickStar(scraped);
      setTimeout(() => setToggleDocs(docItem), 500);
    },
    [scraped, docItem]
  );
  return (
    <div className="w-full px-5 py-2.5 bg-white mb-2 rounded-md">
      <div className={clsx('flex justify-between w-full mb-2 leading-28 tight-m9')}>
        <Link to={docItem.web_url}>
          <div className={clsx('w-[90%] max-h-15 line-clamp-2', 'text-black-100 text-lg font-bold')}>
            {docItem.headline.main}
          </div>
        </Link>
        <button className="flex-shink-0 w-4 h-4 pt-2" onClick={_onClickStar}>
          <Star className={clsx(scraped && 'star-yellow')} size={16} color={scraped ? '#FFB800' : black80} />
        </button>
      </div>
      <div className={clsx(justifyBetween, 'text-sm leading-20 tight-m65')}>
        <div className={clsx(flexCenter, 'gap-x-2 flex-1')}>
          <span className="line-clamp-1">{docItem.source}</span>
          <span className="line-clamp-1">{docItem.byline.original}</span>
        </div>
        <span className="flex-shrink-0">{format(parseISO(docItem.pub_date), 'yyyy.M.d. (E)', { locale: ko })}</span>
      </div>
    </div>
  );
}
