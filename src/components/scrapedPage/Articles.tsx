import { isSameDay, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import useStore from 'store/zustand';

const Articles = () => {
  const { scrapedDocs, scrapedHeadline, scrapedPubDate, scrapedGlocations } = useStore();
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => {
    return (
      scrapedDocs
        .filter(scrapedDoc => (scrapedHeadline ? scrapedDoc.headline.main.includes(scrapedHeadline) : true))
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
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Articles;
