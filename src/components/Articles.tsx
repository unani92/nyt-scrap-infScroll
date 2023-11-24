import { useQuery } from '@tanstack/react-query';
import { getArticles } from 'lib/api/homeService';
import { Doc, Meta } from 'lib/types';
import { useEffect, useMemo, useState } from 'react';
import useStore from 'store/zustand';

const Articles = () => {
  const { pubDate, headline, glocations } = useStore();
  const [meta, setMeta] = useState<Meta>();
  const [page, setpage] = useState(0);
  const [articles, setArticles] = useState<Doc[]>([]);
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
  useEffect(() => {
    if (data) {
      setMeta(data.meta);
      setArticles(data.docs);
    } else if (error) {
      console.log(error);
    }
  }, [data, isLoading, error]);
  return (
    <div className="overflow-auto h-[calc(100vh-100px)] p-5">
      <div className="h-[10000px]">123</div>
    </div>
  );
};

export default Articles;
