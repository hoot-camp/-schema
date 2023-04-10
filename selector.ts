import { createSelector } from 'reselect'
import { use$SchemaStore } from './store'

export const select$Schema = ($key) =>
    createSelector(
        (state) => state.$data,
        (state) => state.$keyToIndex[$key],
        ($data, $key) => $data[$key],
    )

export const selectChosen$Key = (state) => state.chosen
export const useChosen$KeySelector = () => use$SchemaStore(selectChosen$Key)
