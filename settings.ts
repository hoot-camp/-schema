const string = 'string'
const number = 'number'
const dataKey = true
const included = true
const schema = true
const store = '/store'
const trpc = '/trpc'
const trpcRouter = '/trpcRouter'
const required = true // not null,
const latin1 = 'latin1'
const latin1_bin = 'latin1_bin'
const tinyint = 'tinyint'
const smallint = 'smallint'
const notNull = true

export const name = 'district'

const keys = {
    county: {
        dataKey,
        type: number,
        required,
    },
    ix: {
        dataKey,
        type: number,
        required,
    },
    dv: {
        dataKey,
        type: string,
        required,
        length: 2,
    },
    sub: {
        dataKey,
        type: string,
        length: 3,
        charset: latin1,
        collate: latin1_bin,
        notNull,
    },
}

export const districtKeys = keys
const subschemas = {
    term: {
        schema,
        trpcRouter,
        data: {
            ...keys,
            county: { ...keys.county, required: false, default: 0 },
            ix: { ...keys.ix, required: false, default: 0 },
            dv: { ...keys.dv, required: false, default: null },
            sub: { ...keys.sub, required: false, default: null },
            termId: {
                dataKey,
                type: number,
                required,
            },
            index: { type: number, store: true },
            lengthOfTerm: {
                included,
                type: number,
            },
            effectiveYear: {
                included,
                type: number,
            },
            startingYear: {
                included,
                type: number,
            },
            expiredYear: {
                included,
                type: number,
            },
        },
    },
}

export const data = {
    ...keys,
    ...subschemas,
    index: { type: number, store: true },
    districtTitle: {
        included,
        store,
        trpc,
        type: string,
        length: 48,
        charset: latin1,
        collate: latin1_bin,
    },
}

if (
    typeof process !== 'undefined' &&
    process.argv[1]?.endsWith('/.kit-schema/settings.ts')
) {
    console.log(JSON.stringify({ name, data }))
}
