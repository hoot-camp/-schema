import produce from 'immer'
import { Set$Included } from './types'
import { $included, set$Included } from './config'
import { select$SubSchema } from 'go.vote/.kit-schema/@$data/selectors'
import { $SubSchemaStore } from 'go.vote/.kit-schema/store'

export type At$Included = {
    [set$Included]: (incoming: Set$Included) => void
}

export function $includedSetter(set) {
    return {
        [set$Included]: ({
            $keyListComma,
            $included: $includedValue,
        }: Set$Included): void =>
            set(
                produce<$SubSchemaStore>((state) => {
                    select$SubSchema({ $keyListComma })(state)[$included] =
                        $includedValue
                }),
            ),
    }
}

export const Set$IncludedOnChange = {
    [set$Included]: {} as Set$Included,
}
