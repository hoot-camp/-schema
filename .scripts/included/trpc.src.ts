import { procedure } from 'go.vote/@trpc/trpc'
import { emitter } from 'go.vote/@data/events/emitter'
import { set$IncludedSchema } from './types.zod'
import type { Context } from 'go.vote/@trpc/createContext'
import { Set$Included } from './types'
import { set$Included } from './config'
import { ResultSetHeader } from 'mysql2'
import { name as emitName } from 'go.vote/.kit-schema/settings'

export const set$IncludedRoute = {
    [set$Included]: procedure
        .input(set$IncludedSchema)
        .mutation(resolveSet$Included),
}

export const set$IncludedSql = /* sql */ `
    UPDATE $tableName
        SET $included = ?
    WHERE $whereKeyClause
    ;
`

export async function resolveSet$Included({
    ctx,
    input,
}: {
    ctx: Context
    input: Set$Included
}) {
    const { $keyWithDefaultListComma, $included } = input
    const result = (await ctx.query(set$IncludedSql, [
        $included,
        $keyListComma,
    ])) as ResultSetHeader
    if (!result.changedRows) return null
    emitter.emit(emitName, {
        action: set$Included,
        $keyListComma,
        $included,
    })
    return null
}
