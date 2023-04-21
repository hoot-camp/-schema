import { createSelector } from 'reselect'
import { Keyring } from 'go.vote/.kit-schema/@keyring'
import { use$SubSchemaStore } from 'go.vote/.kit-schema/store'
import { select$SubSchema } from 'go.vote/.kit-schema/@$data/selectors'
import { $included } from './config'
import { $Included } from './types'
import { $SubSchemaStore } from 'go.vote/.kit-schema/store'

export type $IncludedValue = $Included[typeof $included]

export const select$Included = (
    keyring: Keyring,
): ((state: $SubSchemaStore) => $IncludedValue) =>
    createSelector(
        (state: $SubSchemaStore) => select$SubSchema(keyring)(state),
        ($SubSchema) => $SubSchema[$included],
    )

export const use$IncludedValue = (keyring: Keyring): $IncludedValue =>
    use$SubSchemaStore(select$Included(keyring))
