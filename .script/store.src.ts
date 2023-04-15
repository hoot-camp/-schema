import { create } from 'zustand'
import { trpcSubscribers } from 'go.vote/@trpc/helpers'
import type { Flat } from 'go.vote/@/types'

$importList

export type $DatumStore = Flat<$AtItemList>

export const use$DatumStore = create<$DatumStore>((set) => ({
    $setterList,
}))

export const $datumStore = use$DatumStore
export const trpc$DatumOnChangeSubscribers = trpcSubscribers<$DatumStore>(
    $datumStore,
    {
        $trpcOnChangeList,
    },
)
