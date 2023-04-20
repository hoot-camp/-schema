import produce from 'immer'
import { $SubSchemaData } from 'go.vote/.kit-schema/data'
import { $SubSchemaStore } from 'go.vote/.kit-schema/store'
import { $data, dataKeyToIndex, set$Data } from './config'
import { Keys, composite } from 'go.vote/.kit-schema/@keys'

export type At$SubSchemas = {
    [$data]: Array<$SubSchemaData>
    [dataKeyToIndex]: { [key: string]: number }
    [set$Data]: (incoming: Array<$SubSchemaData>) => void
}

export function $subSchemasSetter(set) {
    return {
        [$data]: [],
        [dataKeyToIndex]: {},
        [set$Data]: (incoming: Array<$SubSchemaData>) =>
            set(
                produce<$SubSchemaStore>((state) => {
                    state[$data] = incoming
                    state[dataKeyToIndex] = incoming.reduce(
                        (a, keys: Keys, i) => {
                            a[composite(keys)] = i
                            return a
                        },
                        {},
                    )
                }),
            ),
    }
}
