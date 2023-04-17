const string = 'string'
const number = 'number'
const dataKey = true
const included = true
const schema = true
const store = '/store'
const trpc = '/trpc'
const trpcRouter = '/trpcRouter'

const varchar = 'varchar'
const latin1 = 'latin1'
const latin1_bin = 'latin1_bin'
const tinyint = 'tinyint'
const smallint = 'smallint'
const notNull = true

export const name = '.kit-schema'

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

export const data = {
    ...keys,
    index: { type: number, store: true },
    sub1: { schema, trpcRouter },
    sub2: { schema, trpcRouter },
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
