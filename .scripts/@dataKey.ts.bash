DIR=$(dirname $(realpath $BASH_SOURCE))
BASE_NOEXT=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A type
declare -A optional
while IFS='|' read -r key type required; do
	KEYS+=($key)
    type[$key]=$type
    [ "$required" = 'true' ] && optional[$key]= || optional[$key]='?'
done < <(kit settings $DIR | 
    jq -r '.data | to_entries[] | select(.value.dataKey != null) | '$(
        kit jq-bsv .key .value.type .value.required
    ) | sed 's/\bnull\b//g'
)

for key in ${KEYS[@]}; do
    sedOptions=(
        -e "s/\$key/$key/g"
        -e "s/\$Key/${key^}/g"
        -e "s/\$type/${type[$key]}/g"
        -e "s/\$optional/${optional[$key]}/g"
    )

    sed "${sedOptions[@]}" $DIR/$BASE_NOEXT.src.ts |
        kit prettier > $DIR/../@$key.ts
done
