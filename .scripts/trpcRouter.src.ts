import { router } from 'go.vote/@trpc/trpc'
import { trpcOnChangeRoute } from 'go.vote/@trpc/routes'
import { name as emitName } from './settings'
$importRouters
import { $dataRoute } from './@$data/trpc'
$importItemRoutes

export const trpcRouter = router({
    $trpcRouters,
    ...trpcOnChangeRoute(emitName),
    $trpcRoutes,
})
