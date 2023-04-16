import { $data, compositeKeyToIndex } from './config'
import { Keys, composite } from 'go.vote/.kit-schema/@keys'
import { $SubSchemaStore } from 'go.vote/.kit-schema/store'

export const select$Data = (state: $SubSchemaStore) => state[$data]

export const select$SubSchemaIndex =
    (keys: Keys): ((state: $SubSchemaStore) => number) =>
    (state) =>
        state[compositeKeyToIndex][composite(keys)]

export const select$SubSchema = (keys: Keys) => (state: $SubSchemaStore) =>
    state[$data][select$SubSchemaIndex(keys)(state)]
