import { select$SubSchemaIndex } from './@$data/selectors'
import produce from 'immer'
import { $SubSchemaStore, use$SubSchemaStore } from './store'
import { Keys, composite } from './@keys'

const index = 'index'
const setIndex = 'setIndex'

export type AtIndex = {
    [index]: number
    [setIndex]: (keys: Keys) => void
}

export function indexSetter(set) {
    return {
        [index]: -1,
        [setIndex]: (keys: Keys) =>
            set(
                produce<$SubSchemaStore>((state) => {
                    state[index] = select$SubSchemaIndex(keys)(state)
                }),
            ),
    }
}

export const selectIndex = (state) => state[index]
export const useIndexValue = () => use$SubSchemaStore(selectIndex)

export const select$SubSchemaIndex =
    (keys: Keys): ((state: $SubSchemaStore) => number) =>
    (state) =>
        select$SubSchemaIndex(keys)(state)
