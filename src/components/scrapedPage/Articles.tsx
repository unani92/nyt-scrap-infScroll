import { isSameDay, parseISO } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import useStore from 'store/zustand';
import InfiniteScrollContainer from 'components/elements/InfiniteScrollContainer';
import ArticleItem from 'components/ArticleItem';
import { Snackbar } from 'components/elements/Modal';
import EmptyScraped from './EmptyScraped';

const Articles = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrapedDocs, scrapedHeadline, scrapedPubDate, scrapedGlocations } = useStore();
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    return (
      scrapedDocs
        .filter(scrapedDoc =>
          scrapedHeadline ? scrapedDoc.headline.main.toLowerCase().includes(scrapedHeadline.toLowerCase()) : true
        )
        .filter(scrapedDoc =>
          scrapedPubDate ? isSameDay(parseISO(scrapedDoc.pub_date), parseISO(scrapedPubDate)) : true
        )
        // API 요청을 통해 얻은 article 객체에 glocation 필드가 존재하지 않아 article의 정확한
        // glocation을 알 수 없기 때문에 홈 탭에서 적용해 요청된 glocation을 기준으로 필터 진행
        .filter(scrapedDoc =>
          scrapedGlocations.length > 0 ? scrapedDoc.glocations.some(docG => scrapedGlocations.includes(docG)) : true
        )
    );
  }, [scrapedDocs, scrapedHeadline, scrapedPubDate, scrapedGlocations]);
  useEffect(() => {
    ref.current && ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setPage(1);
    }, 300);
  }, [filtered]);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  return (
    <div ref={ref} className="overflow-auto h-[calc(100vh-90px)] p-5">
      <Snackbar isOpen={Boolean(snackbarMsg)} onClose={() => setSnackbarMsg('')} message={snackbarMsg} />
      {filtered.length > 0 ? (
        <InfiniteScrollContainer
          items={filtered.slice(0, page * 10)}
          totalLength={filtered.length}
          onUpdated={() => setPage(page + 1)}
          renderItem={scrapedDoc => (
            <ArticleItem
              docItem={scrapedDoc}
              onClickStar={isScraped => setSnackbarMsg(`기사가 스크랩 ${isScraped ? '해제' : ''}되었습니다`)}
            />
          )}
        />
      ) : (
        <EmptyScraped />
      )}
    </div>
  );
};

export default Articles;
