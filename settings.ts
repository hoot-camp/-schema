const string = 'string'
const number = 'number'
const dataKey = true

const setter = '/store'
const trpcRoute = '/trpc'

export const name = '.kit-schema'

const keys = {
    d6: { dataKey, type: string },
    sub: { dataKey, type: string },
    officeCode: { dataKey, type: string },
    seatCode: { dataKey, type: number },
}
export const data = {
    ...keys,
    sub1: {
        data: {
            ...keys,
        },
    },
    sub2: {
        data: {
            ...keys,
        },
    },
    chosenIndex: { type: number, setter: true },
    officeTitle: {
        type: string,
        setter,
        trpcRoute,
        trpcOnChangeSubscription: true,
    },
    recurring: {
        type: number,
        setter,
        trpcRoute,
        trpcOnChangeSubscription: true,
    },
    termYears: {
        type: number,
        setter,
        trpcRoute,
        trpcOnChangeSubscription: true,
    },
}

if (
    typeof process !== 'undefined' &&
    process.argv[1]?.endsWith('/.kit-schema/settings.ts')
) {
    console.log(JSON.stringify({ name, data }))
}
