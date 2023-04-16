import { create } from "zustand"
import { trpcSubscribers } from "go.vote/@trpc/helpers"
import type { Flat } from "go.vote/@/types"

import { AtIndex, indexSetter } from "./@index"
import {
    AtOfficeTitle,
    officeTitleSetter,
    SetOfficeTitleOnChange,
} from "./@officeTitle"
import {
    AtRecurring,
    recurringSetter,
    SetRecurringOnChange,
} from "./@recurring"
import {
    AtTermYears,
    termYearsSetter,
    SetTermYearsOnChange,
} from "./@termYears"

export type SchemaStore = Flat<
    AtIndex & AtOfficeTitle & AtRecurring & AtTermYears
>

export const useSchemaStore = create<SchemaStore>((set) => ({
    ...indexSetter(set),
    ...officeTitleSetter(set),
    ...recurringSetter(set),
    ...termYearsSetter(set),
}))

export const schemaStore = useSchemaStore
export const trpcSchemaOnChangeSubscribers = trpcSubscribers<SchemaStore>(
    schemaStore,
    {
        ...SetOfficeTitleOnChange,
        ...SetRecurringOnChange,
        ...SetTermYearsOnChange,
    }
)

