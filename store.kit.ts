import { create } from 'zustand'
import type { Flat } from 'go.vote/@/types'

import { AtData, dataSetter } from './@data/store'
import { AtIndex, indexSetter } from './@index'
import { AtDistrictTitle, districtTitleSetter } from './@districtTitle/store'

export type SchemaStore = Flat<AtIndex & AtDistrictTitle>

export const useSchemaStore = create<SchemaStore>((set) => ({
    ...dataSetter(set),
    ...indexSetter(set),
    ...districtTitleSetter(set),
}))

export const schemaStore = useSchemaStore

