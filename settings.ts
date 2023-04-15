const string = 'string'
const number = 'number'
const key = 'key'
const subSchema = 'subSchema'
const item = 'item'
export const name = '.kit-schema'
export const data = {}

export const fields = {
    d6: { usage: key, type: string },
    sub: { usage: key, type: string },
    officeCode: { usage: key, type: string },
    seatCode: { usage: key, type: number },
    sub1: { usage: subSchema },
    sub2: { usage: subSchema },
    chosenIndex: { type: number, setter: true },
    officeTitle: {
        usage: item,
        type: string,
        setter: '/store',
        trpcRoute: '/trpc',
        trpcOnChangeSubscription: true,
    },
    recurring: {
        usage: item,
        type: number,
        setter: '/store',
        trpcRoute: '/trpc',
        trpcOnChangeSubscription: true,
    },
    termYears: {
        usage: item,
        type: number,
        setter: '/store',
        trpcRoute: '/trpc',
        trpcOnChangeSubscription: true,
    },
}

if (
    typeof process !== 'undefined' &&
    process.argv[1]?.endsWith('/.kit-schema/settings.ts')
) {
    console.log(JSON.stringify({ name, fields }))
}
