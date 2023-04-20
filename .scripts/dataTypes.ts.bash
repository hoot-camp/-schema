SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
DATA=$(pathname data-key $CWD)

while IFS='|' read -r key; do
	KEYS+=($key)
done < <(kit settings $CWD | 
    jq -r "$(kit jq --data $DATA --select '.included' -- .key)" |
    sed 's/\bnull\b//g'
)

TypeList=$(array --join ' \& ' -- Keyring "${KEYS[@]^}")
importTypes=("import { Keyring } from \'.\/@keyring\'")
for key in ${KEYS[@]}; do
    importTypes+=("import { ${key^} } from \'.\/@${key}\/types\'")
done

LF=@@LF@@
importTypesSrc=$(array --join $LF -- "${importTypes[@]}")

sedOptions+=(
    -e "s/\$TypeList/$TypeList/"
    -e "s/^\$importTypes/$importTypesSrc/"
    -e "s/$LF/\\n/g"
)

sed "${sedOptions[@]}" $SRC/$BASE.src.ts > $CWD/$BASE.ts
