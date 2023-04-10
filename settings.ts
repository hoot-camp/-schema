export const name = '$module'

if (
    typeof process !== 'undefined' &&
    process.argv[1].endsWith('/$Module/settings.ts')
) {
    console.log(JSON.stringify({ name }))
}
