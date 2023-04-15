import { create } from "zustand"
import { trpcSubscribers } from "go.vote/@trpc/helpers"
import type { Flat } from "go.vote/@/types"

import { AtD6 } from "./@d6"
import { AtSub } from "./@sub"
import { AtOfficeCode } from "./@officeCode"
import { AtSeatCode } from "./@seatCode"
import { AtChosenIndex, chosenIndexSetter } from "./@chosenIndex"
import {
    AtOfficeTitle,
    officeTitleSetter,
    SetOfficeTitleOnChange,
} from "./@officeTitle/store"
import {
    AtRecurring,
    recurringSetter,
    SetRecurringOnChange,
} from "./@recurring/store"
import {
    AtTermYears,
    termYearsSetter,
    SetTermYearsOnChange,
} from "./@termYears/store"

export type DatumStore = Flat<
    AtD6 &
        AtSub &
        AtOfficeCode &
        AtSeatCode &
        AtChosenIndex &
        AtOfficeTitle &
        AtRecurring &
        AtTermYears
>

export const useDatumStore = create<DatumStore>((set) => ({
    ...chosenIndexSetter(set),
    ...officeTitleSetter(set),
    ...recurringSetter(set),
    ...termYearsSetter(set),
}))

export const datumStore = useDatumStore
export const trpcDatumOnChangeSubscribers = trpcSubscribers<DatumStore>(
    datumStore,
    {
        ...SetOfficeTitleOnChange,
        ...SetRecurringOnChange,
        ...SetTermYearsOnChange,
    }
)

