type Doc = {
  abstract: string;
  web_url: string;
  source: string;
  headline: Headline;
  pub_date: Date;
  by_line: ByLine;
};

type ByLine = {
  original: string;
  person: Person;
};

type Person = {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
};

type Headline = {
  main: string;
  kicker: null;
  content_kicker: null;
  print_headline: null;
  name: null;
  seo: null;
  sub: null;
};

type Meta = {
  hits: number;
  offset: number;
  time: number;
};

type ArticleSearchResponse = {
  docs: Doc[];
  meta: Meta;
};
