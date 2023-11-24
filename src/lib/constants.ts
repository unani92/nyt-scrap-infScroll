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
