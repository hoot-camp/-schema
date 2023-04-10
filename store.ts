import { create } from 'zustand'
import { trpcSubscribers } from 'go.vote/@trpc/helpers'
import {
    titleSetter,
    SetTitleStore,
    SetTitleOnChangeSubscriber,
} from './@title/store'

import { $dataSetter, Set$DataStore } from './@$data/store'
import type { $SchemaMainStore } from './store.main'

export type $SchemaStore = $SchemaMainStore & {
    setChosen: (index: number) => void
} & Set$DataStore &
    SetTitleStore

export const use$SchemaStore = create<$SchemaStore>((set) => ({
    $data: [],
    $keyToIndex: {},
    chosen: -1,
    setChosen: ($key) => set((state) => ({ chosen: state.$keyToIndex[$key] })),
    ...$dataSetter(set),
    ...titleSetter(set),
}))

export const $schemaStore = use$SchemaStore
export const trpc$SchemaSubscribers = trpcSubscribers<$SchemaStore>(
    $schemaStore,
    {
        ...SetTitleOnChangeSubscriber,
    },
)
