CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A type
declare -A optional
while IFS='|' read -r key type required; do
	KEYS+=($key)
    type[$key]=$type
    [ "$required" = 'true' ] && optional[$key]= || optional[$key]='?'
done < <(
    kit settings $CWD | 
    jq -r "$(kit jq-data-select .dataKey) | $(kit jq-dsv \| .key .type .required)" | 
    sed 's/\bnull\b//g'
)

for key in ${KEYS[@]}; do
    sedOptions=(
        -e "s/\$key/$key/g"
        -e "s/\$Key/${key^}/g"
        -e "s/\$type/${type[$key]}/g"
        -e "s/\$optional/${optional[$key]}/g"
    )
    sed "${sedOptions[@]}" $CWD/$BASE.src.ts |
        kit prettier > $CWD/../@$key.ts
done
