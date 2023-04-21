import { $data, dataKeyToIndex } from './config'
import { Keyring, composite } from 'go.vote/.kit-schema/@keyring'
import { $SubSchemaStore } from 'go.vote/.kit-schema/store'

export const select$Data = (state: $SubSchemaStore) => state[$data]

export const select$SubSchemaIndex =
    (keyring: Keyring): ((state: $SubSchemaStore) => number) =>
    (state) =>
        state[dataKeyToIndex][composite(keyring)]

export const select$SubSchema =
    (keyring: Keyring) => (state: $SubSchemaStore) =>
        state[$data][select$SubSchemaIndex(keyring)(state)]
