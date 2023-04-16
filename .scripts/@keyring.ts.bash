DIR=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A type
declare -A required
declare -A default
while IFS='|' read -r key type required default; do
	KEYS+=($key)
    type[$key]=$type
    required[$key]=$required
    default[$key]=$default
done < <(
    kit settings $DIR | 
    jq -r '.data | to_entries[] | select(.value.dataKey != null) | '$(
        kit jq-bsv .key .value.type .value.required .value.default)
)

LF=@LF@
KeyList=$(array --map 'string --capitalize' --join ' \& ' -- ${KEYS[@]})
keyListComma=$(array --join ', ' -- ${KEYS[@]})

for key in ${KEYS[@]}; do
    importKeys+=("import { ${key^} } from \'.\/@${key}\'")
    if [ "${required[$key]}" = 'true' ]; then 
        keyWithDefaultList+=($key)
    else
        [ ${type[$key]} = 'string' ] && 
            defaultValue="\"${default[$key]}\"" || 
            defaultValue=${default[$key]}
        keyWithDefaultList+=("$key = $defaultValue")
    fi
done
importKeysSource=$(array --join $LF -- "${importKeys[@]}")
keyWithDefaultListComma=$(array --join ', ' -- "${keyWithDefaultList[@]}")
sedOptions=(
    -e "s/\$keyWithDefaultListComma/$keyWithDefaultListComma/"
    -e "s/\$keyListComma/$keyListComma/"
    -e "s/\$KeyList/$KeyList/"
    -e "s/^\s*\$importKeys/$importKeysSource/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $DIR/$BASE.src.ts | kit prettier > $DIR/../$BASE.ts
