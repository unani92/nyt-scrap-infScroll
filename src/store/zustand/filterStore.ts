import { Glocation } from 'lib/types';
import { DefaultStore } from 'store/zustand/exampleStore';
import { StateCreator } from 'zustand';

// filterStore
interface FilterState {
  headline?: string;
  pubDate?: string;
  glocation?: Glocation;
}
export interface FilterStore extends FilterState {
  setFilter: (value: FilterState) => void;
}
const filterState: FilterState = {
  headline: undefined,
  pubDate: undefined,
  glocation: undefined,
};
const createFilterStore: StateCreator<DefaultStore & FilterStore, [], [], FilterStore> = set => ({
  ...filterState,
  setFilter: ({ headline, pubDate, glocation }: FilterState) => set(() => ({ headline, pubDate, glocation })),
});

export default createFilterStore;
