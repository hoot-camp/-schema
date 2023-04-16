DIR=$(dirname $(realpath $BASH_SOURCE))

declare -A type
declare -A required
declare -A default
while IFS='|' read -r key type required default; do
	KEYS+=($key)
    type[$key]=$type
done < <(
    kit settings $DIR | 
    jq -r "$(kit jq-data-select .item) | $(kit jq-bsv .key .type)"
)


subSchema=$(pathname sub-schema $DIR)
[ $subSchema = '.kit-schema' ] && subSchema=schema
data=$(string --plural -- $subSchema)

targetPath=$(realpath --relative-to=$(pwd) $DIR/..)

for key in ${KEYS[@]}; do
    target=$targetPath/@$key/.scripts
    echo $target
    mkdir -p $target
    degit hoot-camp/-data $path
done

