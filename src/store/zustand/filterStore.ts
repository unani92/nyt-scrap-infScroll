import { Glocation } from 'lib/types';
import { DefaultStore } from 'store/zustand/exampleStore';
import { StateCreator } from 'zustand';
import { GLOCATION_ITEMS } from 'lib/constants';

// filterStore
interface FilterState {
  headline?: string;
  pubDate?: string;
  glocations: Glocation[];
}
export interface FilterStore extends FilterState {
  setFilter: (value: FilterState) => void;
  getGlocationsParsed: () => string;
}
const filterState: FilterState = {
  headline: undefined,
  pubDate: undefined,
  glocations: [],
};
const createFilterStore: StateCreator<DefaultStore & FilterStore, [], [], FilterStore> = (set, get) => ({
  ...filterState,
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
  setFilter: ({ headline, pubDate, glocations }: FilterState) => set(() => ({ headline, pubDate, glocations })),
});

export default createFilterStore;
