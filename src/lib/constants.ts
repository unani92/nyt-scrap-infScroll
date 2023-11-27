import { Glocation, ValueLabel } from './types';

export const BASE_URL = 'https://api.nytimes.com/svc/search/v2';

export const GLOCATION_ITEMS: ValueLabel<Glocation>[] = [
  { value: Glocation.SOUTH_KOREA, label: '대한민국' },
  { value: Glocation.CHINA, label: '중국' },
  { value: Glocation.JAPAN, label: '일본' },
  { value: Glocation.USA, label: '미국' },
  { value: Glocation.NORTH_KOREA, label: '북한' },
  { value: Glocation.RUSSIA, label: '러시아' },
  { value: Glocation.FRANCE, label: '프랑스' },
  { value: Glocation.UK, label: '영국' },
];

export const EMPTY_SCRAPDE_ITEM = '저장된 스크랩이 없습니다.';
export const EMPTY_SEARCH_RESULT = '검색 결과가 없습니다.';
export const GO_TO_MAIN = '스크랩 하러 가기';
export const CHANGE_SEARCH_FILTER = '검색 필터 변경하기';
