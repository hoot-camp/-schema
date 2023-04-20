import { compositeKeys, splitKey } from 'go.vote/@/helpers'
import type { Flat } from 'go.vote/@/types'
import { County } from './@county'
import { Ix } from './@ix'
import { Dv } from './@dv'
import { Sub } from './@sub'

export type Keyring = Flat<County & Ix & Dv & Sub>

export const composite = ({ county, ix, dv, sub = '' }: Keyring): string =>
    compositeKeys(county, ix, dv, sub)

export const ring = ({ county, ix, dv, sub = '' }: Keyring): Keyring => ({
    county,
    ix,
    dv,
    sub,
})

export const uncombine = (dataKey: string) => {
    const [county, ix, dv, sub] = splitKey(dataKey)
    return { county, ix, dv, sub }
}

