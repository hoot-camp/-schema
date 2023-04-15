import { router } from 'go.vote/@trpc/trpc'
import { name as emitName } from './settings'
import { trpcRouter as sub1 } from './sub1/trpcRouter'
import { trpcRouter as sub2 } from './sub2/trpcRouter'

import { trpcOnChangeRoute } from 'go.vote/@trpc/routes'

import { $dataRoute } from './@data/trpc'
import { setOfficeTitleRoute } from './@officeTitle/trpc'
import { setRecurringRoute } from './@recurring/trpc'
import { setTermYearsRoute } from './@termYears/trpc'


export const trpcRouter = router({
    sub1,
    sub2,

    ...trpcOnChangeRoute(emitName),
    ...setOfficeTitleRoute,
    ...setRecurringRoute,
    ...setTermYearsRoute,

})
