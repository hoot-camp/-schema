import { selectDatumIndex } from "./@data/selectors"
import produce from "immer"
import { DatumStore, useDatumStore } from "./store"
import { Keys, composite } from "./@keys"

const index = "index"
const setIndex = "setIndex"

export type AtIndex = {
    [index]: number
    [setIndex]: (keys: Keys) => void
}

export function indexSetter(set) {
    return {
        [index]: -1,
        [setIndex]: (keys: Keys) =>
            set(
                produce<DatumStore>((state) => {
                    state[index] = selectDatumIndex(keys)(state)
                })
            ),
    }
}

export const selectIndex = (state) => state[index]
export const useIndexValue = () => useDatumStore(selectIndex)

export const selectDatumIndex =
    (keys: Keys): ((state: DatumStore) => number) =>
    (state) =>
        selectDatumIndex(keys)(state)

