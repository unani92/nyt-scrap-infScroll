import { Glocation } from 'lib/types';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// example
interface DefaultState {
  bears: number;
}

interface DefaultStore extends DefaultState {
  addBear: () => void;
}

const defaultState: DefaultState = {
  bears: 0,
};

const createDefaultStore: StateCreator<DefaultStore, [], [], DefaultStore> = (set, get) => ({
  ...defaultState,
  addBear: () => set(state => ({ ...state, bears: state.bears + 1 })),
});

// filterStore
export interface FilterState {
  headline?: string;
  pubDate?: string;
  glocation?: Glocation;
}
interface FilterStore extends FilterState {
  setFilter: (value: FilterState) => void;
}
const filterState: FilterState = {
  headline: undefined,
  pubDate: undefined,
  glocation: undefined,
};
const createFilterStore: StateCreator<DefaultStore & FilterStore, [], [], FilterStore> = (set, get) => ({
  ...filterState,
  setFilter: ({ headline, pubDate, glocation }: FilterState) => set(state => ({ headline, pubDate, glocation })),
});

const useStore = create<DefaultStore & FilterStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createDefaultStore(...a),
        ...createFilterStore(...a),
      }),
      { name: 'store', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useStore;
