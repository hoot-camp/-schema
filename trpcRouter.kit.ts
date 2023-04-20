import { router } from 'go.vote/@trpc/trpc'
import { trpcRouter as term } from './term/trpcRouter'
import { dataRoute } from './@data/trpc'
import { setDistrictTitleRoute } from './@districtTitle/trpc'

export const trpcRouter = router({
    term,
    ...dataRoute,
    ...setDistrictTitleRoute,
})

