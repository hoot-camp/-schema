SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$(dirname $(realpath $BASH_SOURCE))/..}
DATA=$(pathname data-key $CWD)
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A type
declare -A required
declare -A default
while IFS='|' read -r key type required default; do
	KEYS+=($key)
    type[$key]=$type
done < <(
    kit settings $CWD | 
    jq -r "$(kit jq --data $DATA --select .included -- .key .type)"
)

subSchema=$(pathname sub-schema $CWD)
[ $subSchema = '.kit-schema' ] && subSchema=schema
data=$(string --plural -- $subSchema)

sourceDir=$KIT_SCRIPTS/$BASE

for key in ${KEYS[@]}; do
    target=$CWD/@$key
    mkdir -p $(dirname $target)
    echo $sourceDir/*.bash | 
        xargs -n1 basename -s .bash -a | 
        xargs -I {} kit script $BASE/{} --cwd $target --included $key
done
