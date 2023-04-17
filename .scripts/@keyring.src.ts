import { compositeKeys, splitKey } from 'go.vote/@/helpers'
import type { Flat } from 'go.vote/@/types'
$importKeyList

export type Keyring = Flat<$KeyListAnd>

export const composite = ({ $keyWithDefaultListComma }: Keyring): string =>
    compositeKeys($keyListComma)

export const ring = ({ $keyWithDefaultListComma }: Keyring): Keyring => ({
    $keyListComma,
})

export const uncombine = (dataKey: string) => {
    const [$keyListComma] = splitKey(dataKey)
    return { $keyListComma }
}
