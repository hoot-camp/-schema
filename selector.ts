import { createSelector } from 'reselect'
import { use$DatumStore } from './store'

export const select$Datum = ($keyJoinComma) =>
    createSelector(
        (state) => state.$data,
        (state) => state.$keyListToIndex[state.concatKeys($keyJoinComma)],
        ($data, index) => $data[index],
    )

export const selectChosen$KeyList = (state) => state.chosen
export const useChosen$KeyListSelector = () =>
    use$DatumStore(selectChosen$KeyList)
