export type ArticleResponse = {
  docs: Doc[];
  meta: Meta;
};

export type ArticleRequestParams = {
  page?: number;
  sort: 'newest';
  'api-key': string;
  end_date: string;
  fl: string;
  fq?: string;
};

export type Doc = {
  abstract: string;
  web_url: string;
  source: string;
  headline: Headline;
  pub_date: string;
  byline: ByLine;
};

export type ByLine = {
  original: string;
  person: Person;
};

export type Person = {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
};

export type Headline = {
  main: string;
  kicker: null;
  content_kicker: null;
  print_headline: null;
  name: null;
  seo: null;
  sub: null;
};

export type Meta = {
  hits: number;
  offset: number;
  time: number;
};

export type ArticleSearchResponse = {
  docs: Doc[];
  meta: Meta;
};

export enum Glocation {
  SOUTH_KOREA = 'SOUTH KOREA',
  NORTH_KOREA = 'NORTH KOREA',
  CHINA = 'CHINA',
  JAPAN = 'JAPAN',
  USA = 'UNITED STATES OF AMERICA',
  RUSSIA = 'RUSSIA',
  FRANCE = 'FRANCE',
  UK = 'ENGLAND", "SCOTLAND", "WALES", "NORTHERN IRELAND',
}

export type ValueLabel<T> = {
  value: T;
  label: string;
};
