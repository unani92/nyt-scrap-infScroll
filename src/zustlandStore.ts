import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

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

const useStore = create<DefaultStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createDefaultStore(...a),
      }),
      { name: 'store', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useStore;
