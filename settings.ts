export const name = '$datumJoinDot'

if (
    typeof process !== 'undefined' &&
    process.argv[1].endsWith('/$DatumPath/settings.ts')
) {
    console.log(JSON.stringify({ name }))
}
