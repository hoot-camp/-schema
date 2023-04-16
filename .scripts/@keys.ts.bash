DIR=$(dirname $(realpath $BASH_SOURCE))
BASE_NOEXT=$(basename $BASH_SOURCE | cut -d. -f1)

while IFS='|' read -r key; do
	KEYS+=($key)
done < <(
    kit settings $DIR | 
    jq -r '.data | to_entries[] | select(.value.dataKey != null) | .key'
)

LF=@LF@
KeyList=$(array --map 'string --capitalize' --join ' \& ' -- ${KEYS[@]})
for key in ${KEYS[@]}; do
    importKeys+=("import { ${key^} } from \'.\/@${key}\'")
done
importKeysSource=$(array --join $LF -- "${importKeys[@]}")

sedOptions=(
    -e "s/\$KeyList/$KeyList/"
    -e "s/^\s*\$importKeys/$importKeysSource/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $DIR/$BASE_NOEXT.src.ts > $DIR/../$BASE_NOEXT.ts
