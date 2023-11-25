import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { DefaultStore } from './exampleStore';
import { FilterStore } from './filterStore';
import { ScrapedDocStore } from './scrapedDocStore';
import createDefaultStore from './exampleStore';
import createFilterStore from './filterStore';
import createScrapedDocStore from './scrapedDocStore';

const useStore = create<DefaultStore & FilterStore & ScrapedDocStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createDefaultStore(...a),
        ...createFilterStore(...a),
        ...createScrapedDocStore(...a),
      }),
      { name: 'store', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useStore;
