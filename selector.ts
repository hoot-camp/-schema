import { createSelector } from 'reselect'
import { use$DatumStore } from './store'

export const select$Datum = ($keyList) =>
    createSelector(
        (state) => state.$data,
        (state) => state.$keyListToIndex[state.concatKeys($keyList)],
        ($data, index) => $data[index],
    )

export const selectChosen$KeyList = (state) => state.chosen
export const useChosen$KeyListSelector = () =>
    use$DatumStore(selectChosen$KeyList)
