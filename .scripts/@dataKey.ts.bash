DIR=$(dirname $(realpath $BASH_SOURCE))
BASE_NOEXT=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A type
while IFS='|' read -r key type; do
	KEYS+=($key)
    type[$key]=$type
done < <(kit settings $DIR | 
    jq -r '.data | to_entries[] | select(.value.dataKey != null) | '$(
        kit jq-bsv .key .value.type
    ) | sed 's/\bnull\b//g'
)

for key in ${KEYS[@]}; do
    sedOptions=(
        -e "s/\$key/$key/g"
        -e "s/\$Key/${key^}/g"
        -e "s/\$type/${type[$key]}/g"
    )

    sed "${sedOptions[@]}" $DIR/$BASE_NOEXT.src.ts |
        kit prettier > $DIR/../@$key.ts
done
