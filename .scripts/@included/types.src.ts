import type { Flat } from 'go.vote/@/types'
import type { Keyring } from 'go.vote/.kit-schema/@keyring'

export type $Included = {
    $included: number
}
export type Set$Included = Flat<Keyring & $Included>
