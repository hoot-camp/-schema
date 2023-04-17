const string = 'string'
const number = 'number'
const dataKey = true
const included = true
const schema = true
const store = '/store'
const trpc = '/trpc'
const trpcRouter = '/trpcRouter'

const latin1 = 'latin1'
const latin1_bin = 'latin1_bin'
const tinyint = 'tinyint'
const smallint = 'smallint'
const notNull = true

export const name = 'Test'

const keys = {
    d6: {
        dataKey,
        type: string,
        required: true,
        length: 9,
        charset: latin1,
        collate: latin1_bin,
        notNull,
    },
    sub: {
        dataKey,
        type: string,
        length: 3,
        charset: latin1,
        collate: latin1_bin,
        default: '',
        notNull,
    },
    officeCode: {
        dataKey,
        type: string,
        length: 2,
        charset: latin1,
        collate: latin1_bin,
        default: '',
        notNull,
    },
    seatCode: {
        dataKey,
        type: number,
        sqlType: tinyint,
        default: 0,
        notNull,
    },
}

export const schemas = {
    sub1: {
        schema,
        trpcRouter,
        data: {
            ...keys,
            index: { type: number, store: true },
            term1Years: {
                included,
                type: number,
                store,
                trpc,
                trpcOnChangeSubscription: true,
                sqlType: smallint,
                default: 0,
            },
        },
    },
    sub2: {
        schema,
        trpcRouter,
        data: {
            ...keys,
            index: { type: number, store: true },
            term2Years: {
                included,
                type: number,
                store,
                trpc,
                trpcOnChangeSubscription: true,
                sqlType: smallint,
                default: 0,
            },
        },
    },
}

export const data = {
    ...keys,
    ...schemas,
    index: { type: number, store: true },
    officeTitle: {
        included,
        type: string,
        store,
        trpc,
        trpcOnChangeSubscription: true,
        length: 9,
        charset: latin1,
        collate: latin1_bin,
        default: '',
        notNull,
    },
    termYears: {
        included,
        type: number,
        store,
        trpc,
        trpcOnChangeSubscription: true,
        sqlType: smallint,
        default: 0,
    },
}

if (
    typeof process !== 'undefined' &&
    process.argv[1]?.endsWith('/.kit-schema/settings.ts')
) {
    console.log(JSON.stringify({ name, data }))
}
