import { router, procedure } from 'go.vote/@trpc/trpc'
import { router as sub } from './Sub/trpcRouter'
import { observable } from '@trpc/server/observable'
import { emitter } from 'go.vote/@data/events/emitter'
import { name as emitName } from './settings'
import { $dataRoute } from './@$data/trpc'
import { setTitleRoute } from './@title/trpc'

export const trpcRouter = router({
    ...$dataRoute,
    ...setTitleRoute,
    sub,
    onChange: procedure.subscription(() => {
        return observable((subscriber) => {
            emitter.on(emitName, subscriber.next)
            return () => {
                emitter.off(emitName, console.log)
            }
        })
    }),
})
