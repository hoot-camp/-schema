import { createSelector } from 'reselect'
import { use$DatumStore } from './store'

export const select$Datum = ($key) =>
    createSelector(
        (state) => state.$data,
        (state) => state.$keyToIndex[$key],
        ($data, $key) => $data[$key],
    )

export const selectChosen$Key = (state) => state.chosen
export const useChosen$KeySelector = () => use$DatumStore(selectChosen$Key)
