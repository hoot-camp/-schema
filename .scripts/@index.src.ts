import produce from 'immer'
import { $SubSchemaStore, use$SubSchemaStore } from './store'
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
                produce<$SubSchemaStore>((state) => {
                    state[index] = select$SubSchemaIndex(keyring)(state)
                }),
            ),
    }
}

export const selectIndex = (state) => state[index]
export const useIndexValue = () => use$SubSchemaStore(selectIndex)

export const select$SubSchemaIndex =
    (keyring: Keyring): ((state: $SubSchemaStore) => number) =>
    (state) =>
        select$SubSchemaIndex(keyring)(state)
