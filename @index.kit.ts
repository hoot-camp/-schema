import produce from 'immer'
import { SchemaStore, useSchemaStore } from './store'
import { Keyring, composite } from './@keyring'

const index = 'index'
const setIndex = 'setIndex'

export type AtIndex = {
    [index]: number
    [setIndex]: (keyring: Keyring) => void
}

export function indexSetter(set) {
    return {
        [index]: -1,
        [setIndex]: (keyring: Keyring) =>
            set(
                produce<SchemaStore>((state) => {
                    state[index] = selectSchemaIndex(keyring)(state)
                })
            ),
    }
}

export const selectIndex = (state) => state[index]
export const useIndexValue = () => useSchemaStore(selectIndex)

export const selectSchemaIndex =
    (keyring: Keyring): ((state: SchemaStore) => number) =>
    (state) =>
        selectSchemaIndex(keyring)(state)

