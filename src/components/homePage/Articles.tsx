import { useQuery } from '@tanstack/react-query';
import { getArticles } from 'lib/api/homeService';
import { Doc, Meta } from 'lib/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import useStore from 'store/zustand';
import InfiniteScrollContainer from '../elements/InfiniteScrollContainer';
import ArticleItem from 'components/ArticleItem';
import { Snackbar } from 'components/elements/Modal';
import EmptySearchResult from './EmptySearchResult';
import { blue500 } from 'lib/styles';
import LoadingSpinner from 'components/elements/LoadingSpinner';

const Articles = ({ emptySearchResultHandler }: { emptySearchResultHandler?: () => void }) => {
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
      const res = page === 0 ? data.docs : docs.concat(data.docs);
      page === 0 && setMeta(data.meta);
      setDocs(res);
      setEnabled(false);
    } else if (error) {
      // API 사용량 초과로 에러 발생 시 토스트 노출
      // 스크롤 제일 위로 올려서 지속적인 에러호출 차단
      // 에러 발생한 만큼 페이지 수 롤백
      console.log(error);
      setSnackbarMsg('에러가 발생했어요. 잠시 후 시도 바랍니다.');
      ref.current && ref.current.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setEnabled(false);
        setPage(page - 1);
      }, 300);
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
  const [snackbarMsg, setSnackbarMsg] = useState('');
  return (
    <div ref={ref} className="overflow-auto h-[calc(100vh-90px)] p-5">
      <Snackbar isOpen={Boolean(snackbarMsg)} onClose={() => setSnackbarMsg('')} message={snackbarMsg} />
      <LoadingSpinner loading={isLoading} />
      {docs.length === 0 && !isLoading ? (
        <EmptySearchResult emptySearchResultHandler={emptySearchResultHandler} />
      ) : (
        <InfiniteScrollContainer
          items={docs}
          totalLength={meta?.hits}
          onUpdated={() => onUpdated(isLoading, page)}
          renderItem={docItem => (
            <ArticleItem
              docItem={docItem}
              onClickStar={isScraped => setSnackbarMsg(`기사가 스크랩 ${isScraped ? '해제' : ''}되었습니다`)}
            />
          )}
        />
      )}
    </div>
  );
};

export default Articles;
