import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { DefaultStore } from './exampleStore';
import { FilterStore } from './filterStore';
import createDefaultStore from './exampleStore';
import createFilterStore from './filterStore';

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
