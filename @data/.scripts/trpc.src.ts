import { procedure } from 'go.vote/@trpc/trpc'
import { $data } from './config'

const $dataSql = /* sql */ `
    SELECT
        $selectListComma
    FROM $schema.$data;
`
export const $dataRoute = {
    [$data]: procedure.query(async ({ ctx }) => {
        const $data = (await ctx.query($dataSql)) as []
        return $data
    }),
}
