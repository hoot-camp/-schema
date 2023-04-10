import { createSelector } from 'reselect'
import { use$ModuleStore } from './store'

export const select$Module = ($key) =>
    createSelector(
        (state) => state.$data,
        (state) => state.$keyToIndex[$key],
        ($data, $key) => $data[$key],
    )

export const selectChosen$Key = (state) => state.chosen
export const useChosen$KeySelector = () => use$ModuleStore(selectChosen$Key)
