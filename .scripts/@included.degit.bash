CWD=$(dirname $(realpath $BASH_SOURCE))

declare -A type
declare -A required
declare -A default
while IFS='|' read -r key type required default; do
	KEYS+=($key)
    type[$key]=$type
done < <(
    kit settings $CWD | 
    jq -r "$(kit jq-data-select .included) | $(kit jq-bsv .key .type)"
)


subSchema=$(pathname sub-schema $CWD)
[ $subSchema = '.kit-schema' ] && subSchema=schema
data=$(string --plural -- $subSchema)

targetPath=$(realpath --relative-to=$(pwd) $CWD/..)

for key in ${KEYS[@]}; do
    target=$targetPath/@$key/.scripts
    mkdir -p $(dirname $target)
    degit hoot-camp/-included $target
    wf $target/*.bash | xargs -n1 bash
done

