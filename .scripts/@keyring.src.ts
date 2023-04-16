import { compositeKeys, splitKey } from 'go.vote/@/helpers'
import type { Flat } from 'go.vote/@/types'
$importKeys

export type Keyring = Flat<$KeyList>

export const composite = ({ $keyWithDefaultListComma }: Keyring): string =>
    compositeKeys($keyListComma)

export const ring = ({ $keyWithDefaultListComma }: Keyring): Keyring => ({
    $keyListComma,
})

export const dataKeyToKeyring = (dataKey: string) => {
    const [$keyListComma] = splitKey(dataKey)
    return { $keyListComma }
}
