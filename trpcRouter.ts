import { router } from 'go.vote/@trpc/trpc'
import { router as $subschema } from './$Subschema/trpcRouter'
import { trpcOnChangeRoute } from 'go.vote/@trpc/routes'
import { name as emitName } from './settings'
import { $dataRoute } from './@$data/trpc'
import { setTitleRoute } from './@title/trpc'

export const trpcRouter = router({
    $subschema,
    ...trpcOnChangeRoute(emitName),
    ...$dataRoute,
    ...setTitleRoute,
})
