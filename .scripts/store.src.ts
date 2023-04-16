import { create } from 'zustand'
import { trpcSubscribers } from 'go.vote/@trpc/helpers'
import type { Flat } from 'go.vote/@/types'

$importList

export type $SubSchemaStore = Flat<$AtItemList>

export const use$SubSchemaStore = create<$SubSchemaStore>((set) => ({
    $setterList,
}))

export const $subSchemaStore = use$SubSchemaStore
export const trpc$SubSchemaOnChangeSubscribers =
    trpcSubscribers<$SubSchemaStore>($subSchemaStore, {
        $trpcOnChangeList,
    })
