import { router } from 'go.vote/@trpc/trpc'
import { name as emitName } from './settings'

import { trpcOnChangeRoute } from 'go.vote/@trpc/routes'

import { dataRoute } from './@data/trpc'

export const trpcRouter = router({
    ...trpcOnChangeRoute(emitName),
    ...dataRoute,
})

