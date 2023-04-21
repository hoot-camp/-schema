import { createSelector } from 'reselect'
import { Keyring } from 'go.vote/.kit-schema/@keyring'
import { useSchemaStore } from 'go.vote/.kit-schema/store'
import { selectSchema } from 'go.vote/.kit-schema/@data/selectors'
import { included } from './config'
import { Included } from './types'
import { SchemaStore } from 'go.vote/.kit-schema/store'

export type IncludedValue = Included[typeof included]

export const selectIncluded = (
    keyring: Keyring,
): ((state: SchemaStore) => IncludedValue) =>
    createSelector(
        (state: SchemaStore) => selectSchema(keyring)(state),
        (Schema) => Schema[included],
    )

export const useIncludedValue = (keyring: Keyring): IncludedValue =>
    useSchemaStore(selectIncluded(keyring))
