import { Glocation } from 'lib/types';
import { DefaultStore } from 'store/zustand/exampleStore';
import { StateCreator } from 'zustand';
import { GLOCATION_ITEMS } from 'lib/constants';
import { format, parseISO } from 'date-fns';

// filterStore
interface FilterState {
  headline?: string;
  pubDate?: string; // yyyy-MM-dd
  glocations: Glocation[];
  page?: number;
}
export interface FilterStore extends FilterState {
  setFilter: (value: FilterState) => void;
  setPage: () => void;
  getGlocationsParsed: () => string;
  getPubDateDot: () => string;
  getFq: () => string;
}
const filterState: FilterState = {
  headline: undefined,
  pubDate: undefined,
  glocations: [],
  page: 0,
};
const createFilterStore: StateCreator<DefaultStore & FilterStore, [], [], FilterStore> = (set, get) => ({
  ...filterState,
  getFq: () => {
    const headline = get().headline;
    const glocations = get().glocations;
    const pubDate = get().pubDate;
    const fqArr = [
      headline ? `headline:("${headline}")` : null,
      glocations.length > 0
        ? `glocations:(${glocations.reduce((acc, curr, idx) => acc + `${idx ? ',' : ''}"${curr}"`, '')})`
        : null,
      pubDate ? `pub_date:(${pubDate})` : null,
    ].filter(item => item !== null);
    return fqArr.join(' AND ');
  },
  getPubDateDot: () => (get().pubDate ? format(parseISO(get().pubDate!), 'yyyy.M.d') : ''),
  getGlocationsParsed: () => {
    const glocations = get().glocations;
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
  setFilter: ({ headline, pubDate, glocations }: FilterState) =>
    set(() => ({ headline, pubDate, glocations, page: 0 })),
  setPage: () => set(state => ({ page: (state.page || 0) + 1 })),
});

export default createFilterStore;
