import { StateCreator } from 'zustand';

// example
interface DefaultState {
  bears: number;
  tiger: number;
}

export interface DefaultStore extends DefaultState {
  addBear: () => void;
  addTiger: () => void;
}

const defaultState: DefaultState = {
  bears: 0,
  tiger: 10,
};

const createDefaultStore: StateCreator<DefaultStore, [], [], DefaultStore> = (set, get) => ({
  ...defaultState,
  addBear: () => set(state => ({ bears: state.bears + 1 })),
  addTiger: () => set(state => ({ tiger: state.tiger + 1 })),
});

export default createDefaultStore;
