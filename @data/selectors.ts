import { data, compositeKeyToIndex } from './config'
import { Keys, composite } from 'go.vote/.kit-schema/@keys'
import { SchemaStore } from 'go.vote/.kit-schema/store'

export const selectData = (state: SchemaStore) => state[data]

export const selectSchemaIndex =
    (keys: Keys): ((state: SchemaStore) => number) =>
    (state) =>
        state[compositeKeyToIndex][composite(keys)]

export const selectSchema = (keys: Keys) => (state: SchemaStore) =>
    state[data][selectSchemaIndex(keys)(state)]
