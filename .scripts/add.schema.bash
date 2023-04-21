SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
DATA=$(pathname data-key $CWD)

declare -A store
declare -A onChange
while IFS='|' read -r key store onChange; do
	KEYS+=($key)
done < <(
    kit settings $CWD | 
    jq -r "$(kit jq --data $DATA --select .schema -- .key)"
)

if [ ! $SCHEMA ]; then
    echo \-\-schema schema is not specified.
    exit 1
fi
if [[ ! " ${KEYS[@]} " =~ " $SCHEMA " ]]; then
    echo schema $SCHEMA is not defined.
    exit 1
fi

echo $CWD/$SCHEMA
mkdir -p $CWD/$SCHEMA
shopt -s extglob
echo $KIT_SCRIPTS/*.@(ts|sql|dir).bash | 
    xargs -n1 basename  -s .bash -a | 
    xargs -I {} kit script {} --cwd $CWD/$SCHEMA

wf --regex '.*/d6/.*(dataTypes.ts|types.ts)' | 
    xargs -n1 kit data-types