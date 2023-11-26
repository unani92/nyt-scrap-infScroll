import { Doc, Glocation, ScrapedDoc } from 'lib/types';
import { StateCreator } from 'zustand';
import { FilterState, FilterStore } from './filterStore';
import { format, parseISO } from 'date-fns';
import { GLOCATION_ITEMS } from 'lib/constants';

interface ScrapedDocsFilter {
  scrapedHeadline?: string;
  scrapedPubDate?: string; // yyyy-MM-dd
  scrapedGlocations: Glocation[];
}

interface ScrapedDocState extends ScrapedDocsFilter {
  scrapedDocs: ScrapedDoc[];
}
export interface ScrapedDocStore extends ScrapedDocState {
  setToggleDocs: (article: Doc) => void;
  setScrapedFilter: (value: FilterState) => void;
  getScrapedGlocationsParsed: () => string;
  getScrapedPubDateDot: () => string;
}

const scrapedDocState: ScrapedDocState = {
  scrapedDocs: [],
  scrapedHeadline: undefined,
  scrapedPubDate: undefined,
  scrapedGlocations: [],
};

const createScrapedDocStore: StateCreator<ScrapedDocStore & FilterStore, [], [], ScrapedDocStore> = (set, get) => ({
  ...scrapedDocState,
  // id가 따로 없는 open api 특성 상 web_url을 unique한 값으로 간주
  setToggleDocs: (article: Doc) =>
    set(state => ({
      scrapedDocs: state.scrapedDocs.some(doc => doc.web_url === article.web_url)
        ? state.scrapedDocs.filter(doc => doc.web_url !== article.web_url)
        : [...state.scrapedDocs, { ...article, glocations: get().glocations }],
    })),

  // scraped page filter
  setScrapedFilter: ({ headline, pubDate, glocations }: FilterState) =>
    set(() => ({ scrapedHeadline: headline, scrapedPubDate: pubDate, scrapedGlocations: glocations })),
  getScrapedPubDateDot: () => (get().scrapedPubDate ? format(parseISO(get().scrapedPubDate!), 'yyyy.M.d') : ''),
  getScrapedGlocationsParsed: () => {
    const glocations = get().scrapedGlocations;
    return glocations.length > 0
      ? glocations.length === 1
        ? GLOCATION_ITEMS.find(item => item.value === glocations[0])!.label
        : GLOCATION_ITEMS.find(
            item =>
              item.value ===
              glocations.sort(
                (a, b) =>
                  GLOCATION_ITEMS.findIndex(item => item.value === a) -
                  GLOCATION_ITEMS.findIndex(item => item.value === b)
              )[0]
          )!.label + ` 외 ${glocations.length - 1}개`
      : '';
  },
});

export default createScrapedDocStore;
