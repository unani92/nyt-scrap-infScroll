import { Doc } from 'lib/types';
import { StateCreator } from 'zustand';

interface ScrapedDocState {
  scrapedDocs: Doc[];
}

export interface ScrapedDocStore extends ScrapedDocState {
  setToggleDocs: (article: Doc) => void;
}

const scrapedDocState: ScrapedDocState = {
  scrapedDocs: [],
};

const createScrapedDocStore: StateCreator<ScrapedDocStore, [], [], ScrapedDocStore> = set => ({
  ...scrapedDocState,
  // id가 따로 없는 open api 특성 상 web_url을 unique한 값으로 간주
  setToggleDocs: (article: Doc) =>
    set(state => ({
      scrapedDocs: state.scrapedDocs.some(doc => doc.web_url === article.web_url)
        ? state.scrapedDocs.filter(doc => doc.web_url !== article.web_url)
        : [...state.scrapedDocs, article],
    })),
});

export default createScrapedDocStore;
