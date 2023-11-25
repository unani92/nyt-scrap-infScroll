import { useQuery } from '@tanstack/react-query';
import { getArticles } from 'lib/api/homeService';
import { Doc, Meta } from 'lib/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useStore from 'store/zustand';
import InfiniteScrollContainer from './elements/InfiniteScrollContainer';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { flexCenter, justifyBetween } from 'lib/styles';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const Articles = () => {
  const { getFq } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const [meta, setMeta] = useState<Meta>();
  const [docs, setDocs] = useState<Doc[]>([]);

  const [page, setPage] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const { data, isLoading, error } = useQuery({
    queryKey: ['article', getFq(), page],
    queryFn: () => getArticles({ page, fq: getFq() }),
    enabled,
  });
  useEffect(() => {
    if (data) {
      page === 0 && setMeta(data.meta);
      setDocs(page === 0 ? data.docs : docs.concat(data.docs));
      setEnabled(false);
    } else if (error) {
      console.log(error);
    }
  }, [data, isLoading, error]);
  useEffect(() => {
    setPage(0);
    ref.current && ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    setEnabled(true);
  }, [getFq()]);
  return (
    <div ref={ref} className="overflow-auto h-[calc(100vh-90px)] p-5">
      <InfiniteScrollContainer
        items={docs}
        totalLength={meta?.hits}
        onUpdated={() => {
          if (!isLoading) {
            setPage(page + 1);
            setEnabled(true);
          }
        }}
        renderItem={docItem => <ArticleItem docItem={docItem} />}
      />
    </div>
  );
};

function ArticleItem({ docItem }: { docItem: Doc }) {
  const { scrapedDocs, setToggleDocs } = useStore();
  const onClickStar = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setToggleDocs(docItem);
    },
    [docItem]
  );
  const scraped = scrapedDocs.some(scrapedDocs => scrapedDocs.web_url === docItem.web_url);
  return (
    <div className="w-full px-5 py-2.5 bg-white mb-2 rounded-md">
      <div className={clsx('flex justify-between w-full mb-2 leading-28 tight-m9')}>
        <div className={clsx('w-[90%] max-h-15 line-clamp-2', 'text-black-100 text-lg font-bold')}>
          {docItem.headline.main}
        </div>
        <button className="flex-shink-0 w-4 h-4 pt-2" onClick={onClickStar}>
          <Star className={clsx(scraped && 'star-yellow')} size={16} color={scraped ? '#FFB800' : '#6D6D6D'} />
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

export default Articles;
