import { useQuery } from '@tanstack/react-query';
import { getArticles } from 'lib/api/homeService';
import { Doc, Meta } from 'lib/types';
import { useEffect, useMemo, useState } from 'react';
import useStore from 'store/zustand';
import InfiniteScrollContainer from './elements/InfiniteScrollContainer';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { flexCenter, justifyBetween } from 'lib/styles';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const Articles = () => {
  const { pubDate, headline, glocations } = useStore();
  const [meta, setMeta] = useState<Meta>();
  const [page, setpage] = useState(0);
  const [docs, setDocs] = useState<Doc[]>([]);

  const fq = useMemo(() => {
    const fqArr = [
      headline ? `headline:("${headline}")` : null,
      glocations.length > 0
        ? `glocations:(${glocations.reduce((acc, curr, idx) => acc + `${idx ? ',' : ''}"${curr}"`, '')})`
        : null,
      pubDate ? `pub_date:(${pubDate})` : null,
    ].filter(item => item !== null);
    return fqArr.join(' AND ');
  }, [pubDate, headline, glocations]);
  const { data, isLoading, error } = useQuery({
    queryKey: ['article', fq, page],
    queryFn: () => getArticles({ page, fq }),
    enabled: true,
  });
  useEffect(() => setpage(0), [fq]);
  useEffect(() => {
    if (data) {
      setMeta(data.meta);
      setDocs(page === 0 ? data.docs : docs.concat(data.docs));
    } else if (error) {
      console.log(error);
    }
  }, [data, isLoading, error]);
  return (
    <div className="overflow-auto h-[calc(100vh-90px)] p-5">
      <InfiniteScrollContainer
        items={docs}
        totalLength={meta?.hits}
        onUpdated={() => {
          if (!isLoading) {
            setpage(page + 1);
          }
        }}
        renderItem={docItem => <ArticleItem docItem={docItem} />}
      />
    </div>
  );
};

function ArticleItem({ docItem }: { docItem: Doc }) {
  const { scrapedDocs, setToggleDocs } = useStore();
  const scraped = scrapedDocs.some(scrapedDocs => scrapedDocs.web_url === docItem.web_url);
  return (
    <div className="w-full px-5 py-2.5 bg-white mb-2 rounded-md">
      <div className={clsx('flex justify-between w-full mb-2')}>
        <div className={clsx('w-[90%] max-h-15 line-clamp-2', 'text-black-100 text-lg font-bold leading-28 tight-m9')}>
          {docItem.headline.main}
        </div>
        <button className="flex-shink-0 w-4 h-4" onClick={() => setToggleDocs(docItem)}>
          <Star size={16} color={scraped ? 'yellow' : 'black'} />
        </button>
      </div>
      <div className={clsx(justifyBetween, 'text-sm')}>
        <div className={clsx(flexCenter, 'gap-x-2')}>
          <span>{docItem.source}</span>
          <span>{docItem.byline.original}</span>
        </div>
        <span>{format(parseISO(docItem.pub_date), 'yyyy.M.d. (E)', { locale: ko })}</span>
      </div>
    </div>
  );
}

export default Articles;
