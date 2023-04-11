import { create } from 'zustand'
import { trpcSubscribers } from 'go.vote/@trpc/helpers'
import {
    titleSetter,
    SetTitleStore,
    SetTitleOnChangeSubscriber,
} from './@title/store'

import type { $DatumMainStore } from './store.main'

export type $DatumStore = $DatumMainStore & {
    setChosen: (index: number) => void
} & SetTitleStore

export const use$DatumStore = create<$DatumStore>((set) => ({
    $data: [],
    $keyToIndex: {},
    chosen: -1,
    setChosen: ($key) => set((state) => ({ chosen: state.$keyToIndex[$key] })),
    ...titleSetter(set),
}))

export const $datumStore = use$DatumStore
export const trpc$SchemaOnChangeSubscribers = trpcSubscribers<$DatumStore>(
    $datumStore,
    {
        ...SetTitleOnChangeSubscriber,
    },
)
