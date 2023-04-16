import { compositeKeys } from 'go.vote/@/helpers'
import type { Flat } from 'go.vote/@/types'
$importKeys

export type Keys = Flat<$KeyList>

export const composite = ({ $keyWithDefaultListComma }: Keys): string =>
    compositeKeys($keyListComma)
