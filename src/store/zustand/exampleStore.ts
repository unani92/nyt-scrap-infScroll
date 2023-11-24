import { StateCreator } from 'zustand';

// example
interface DefaultState {
  bears: number;
}

export interface DefaultStore extends DefaultState {
  addBear: () => void;
}

const defaultState: DefaultState = {
  bears: 0,
};

const createDefaultStore: StateCreator<DefaultStore, [], [], DefaultStore> = (set, get) => ({
  ...defaultState,
  addBear: () => set(state => ({ ...state, bears: state.bears + 1 })),
});

export default createDefaultStore;
