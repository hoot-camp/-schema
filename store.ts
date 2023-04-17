import { create } from 'zustand'
import { trpcSubscribers } from 'go.vote/@trpc/helpers'
import type { Flat } from 'go.vote/@/types'

import { AtIndex, indexSetter } from './@index'
import {
    AtOfficeTitle,
    officeTitleSetter,
    SetOfficeTitleOnChange,
} from './@officeTitle/store'
import {
    AtTermYears,
    termYearsSetter,
    SetTermYearsOnChange,
} from './@termYears/store'

export type PanStore = Flat<AtIndex & AtOfficeTitle & AtTermYears>

export const usePanStore = create<PanStore>((set) => ({
    ...indexSetter(set),
    ...officeTitleSetter(set),
    ...termYearsSetter(set),
}))

export const panStore = usePanStore
export const trpcPanOnChangeSubscribers = trpcSubscribers<PanStore>(panStore, {
    ...SetOfficeTitleOnChange,
    ...SetTermYearsOnChange,
})

