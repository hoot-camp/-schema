const string = 'string'
const number = 'number'
const dataKey = true
const item = true
const schema = true
const store = '/store'
const trpc = '/trpc'
const trpcRouter = '/trpcRouter'

export const name = '.kit-schema'

const keys = {
    d6: { dataKey, type: string, required: true },
    sub: { dataKey, type: string, default: '' },
    officeCode: { dataKey, type: string, default: '' },
    seatCode: { dataKey, type: number, default: 0 },
}

export const data = {
    ...keys,
    index: { type: number, store: true },
    sub1: { schema, trpcRouter },
    sub2: { schema, trpcRouter },
    officeTitle: {
        item,
        type: string,
        store,
        trpc,
        trpcOnChangeSubscription: true,
    },
    recurring: {
        item,
        type: number,
        store,
        trpc,
        trpcOnChangeSubscription: true,
    },
    termYears: {
        item,
        type: number,
        store,
        trpc,
        trpcOnChangeSubscription: true,
    },
}

export const schemas = {
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
}

if (
    typeof process !== 'undefined' &&
    process.argv[1]?.endsWith('/.kit-schema/settings.ts')
) {
    console.log(JSON.stringify({ name, data, schemas }))
}
