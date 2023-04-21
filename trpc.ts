import { procedure } from 'go.vote/@trpc/trpc'
import { emitter } from 'go.vote/@data/events/emitter'
import { setSchema } from './types.zod'
import type { Context } from 'go.vote/@trpc/createContext'
import { Set } from './types'
import { set } from './config'
import { ResultSetHeader } from 'mysql2'
import { name as emitName } from 'go.vote/.kit-schema/settings'

export const setRoute = {
    [set]: procedure
        .input(setSchema)
        .mutation(resolveSet),
}

export const setSql = /* sql */ `
    UPDATE schema.data
        SET  = ?
    WHERE county = ? AND ix = ? AND dv = ? AND sub = ?
    ;
`

export async function resolveSet({
    ctx,
    input,
}: {
    ctx: Context
    input: Set
}) {
    const { county, ix, dv, sub = "",  } = input
    const result = (await ctx.query(setSql, [
        ,
        county, ix, dv, sub,
    ])) as ResultSetHeader
    if (!result.changedRows) return null
    emitter.emit(emitName, {
        action: set,
        county, ix, dv, sub,
        ,
    })
    return null
}
