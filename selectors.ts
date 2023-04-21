import { createSelector } from 'reselect'
import { Keyring } from 'go.vote/.kit-schema/@keyring'
import { useSchemaStore } from 'go.vote/.kit-schema/store'
import { selectSchema } from 'go.vote/.kit-schema/@data/selectors'
import {  } from './config'
import {  } from './types'
import { SchemaStore } from 'go.vote/.kit-schema/store'

export type Value = [typeof ]

export const select = (
    keyring: Keyring,
): ((state: SchemaStore) => Value) =>
    createSelector(
        (state: SchemaStore) => selectSchema(keyring)(state),
        (Schema) => Schema[],
    )

export const useValue = (keyring: Keyring): Value =>
    useSchemaStore(select(keyring))
