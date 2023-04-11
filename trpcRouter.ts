import { router } from 'go.vote/@trpc/trpc'
/**import-sub-datum*/
import { trpcOnChangeRoute } from 'go.vote/@trpc/routes'
import { name as emitName } from './settings'
/**import-trpc-route*/
import { setTitleRoute } from './@title/trpc'

export const trpcRouter = router({
    /**spread-sub-datum*/
    ...trpcOnChangeRoute(emitName),
    /**spread-trpc-route*/
    ...setTitleRoute,
})
