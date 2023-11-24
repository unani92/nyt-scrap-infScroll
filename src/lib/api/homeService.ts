import { ArticleRequestParams, ArticleResponse } from 'lib/types';
import http from './axios';
import { format } from 'date-fns';

export function getArticles({ page, endDate, fq }: { page: number; endDate?: string; fq?: string }) {
  const now = new Date();
  return http.get<ArticleResponse, ArticleRequestParams>('/articlesearch.json', {
    params: {
      page,
      sort: 'newest',
      'api-key': process.env.REACT_APP_API_KEY as string,
      end_date: endDate || format(now, 'yyyy-MM-dd'),
      fl: 'abstract,web_url,source,pub_date,headline,byline',
      fq,
    },
  });
}
