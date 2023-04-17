import { router } from 'go.vote/@trpc/trpc'
import { name as emitName } from './settings'
$importRouters
import { trpcOnChangeRoute } from 'go.vote/@trpc/routes'

import { $dataRoute } from './@$data/trpc'
$importItemRoutes

export const trpcRouter = router({
    $trpcRouters,
    ...trpcOnChangeRoute(emitName),
    $trpcRoutes,
})
