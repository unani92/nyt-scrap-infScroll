import { ArticleRequestParams, ArticleResponse } from 'lib/types';
import http from './axios';
import { format } from 'date-fns';

export function getArticles({ page, fq }: { page: number; fq?: string }) {
  console.log('fetch');
  return http.get<ArticleResponse, ArticleRequestParams>('/articlesearch.json', {
    params: {
      page,
      sort: 'newest',
      'api-key': process.env.REACT_APP_API_KEY as string,
      fl: 'abstract,web_url,source,pub_date,headline,byline',
      fq: fq || undefined,
    },
  });
}
