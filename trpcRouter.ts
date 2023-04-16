import { router } from "go.vote/@trpc/trpc"
import { name as emitName } from "./settings"

import { trpcOnChangeRoute } from "go.vote/@trpc/routes"

import { dataRoute } from "./@data/trpc"
import { setOfficeTitleRoute } from "./@officeTitle/trpc"
import { setRecurringRoute } from "./@recurring/trpc"
import { setTermYearsRoute } from "./@termYears/trpc"

export const trpcRouter = router({
    ...trpcOnChangeRoute(emitName),
    ...dataRoute,
    ...setOfficeTitleRoute,
    ...setRecurringRoute,
    ...setTermYearsRoute,
})

