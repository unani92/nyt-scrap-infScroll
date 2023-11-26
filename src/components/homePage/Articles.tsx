import { useQuery } from '@tanstack/react-query';
import { getArticles } from 'lib/api/homeService';
import { Doc, Meta } from 'lib/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import useStore from 'store/zustand';
import InfiniteScrollContainer from '../elements/InfiniteScrollContainer';
import ArticleItem from 'components/ArticleItem';

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
      setEnabled(false);
      console.log(error);
    }
  }, [data, isLoading, error]);
  useEffect(() => {
    ref.current && ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setPage(0);
      setEnabled(true);
    }, 300);
  }, [getFq()]);
  const onUpdated = useCallback((isLoading: boolean, page: number) => {
    if (!isLoading) {
      setPage(page + 1);
      setEnabled(true);
    }
  }, []);
  return (
    <div ref={ref} className="overflow-auto h-[calc(100vh-90px)] p-5">
      <InfiniteScrollContainer
        items={docs}
        totalLength={meta?.hits}
        onUpdated={() => onUpdated(isLoading, page)}
        renderItem={docItem => <ArticleItem docItem={docItem} />}
      />
    </div>
  );
};

export default Articles;
