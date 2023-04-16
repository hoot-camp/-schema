import { select$SubSchemaIndex } from './@$data/selectors'
import produce from 'immer'
import { $SubSchemaStore, use$SubSchemaStore } from './store'
import { Keys } from './@keys'

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
export const useIndexSelector = () => use$SubSchemaStore(selectIndex)
