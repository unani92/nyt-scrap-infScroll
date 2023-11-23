export type Doc = {
  abstract: string;
  web_url: string;
  source: string;
  headline: Headline;
  pub_date: Date;
  by_line: ByLine;
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
