export const name = '$name'

if (
    typeof process !== 'undefined' &&
    process.argv[1].endsWith('/$NamePath/settings.ts')
) {
    console.log(JSON.stringify({ name }))
}
