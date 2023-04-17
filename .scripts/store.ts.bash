CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A store
declare -A onChange
while IFS='|' read -r key store onChange; do
	KEYS+=($key)
    store[$key]=$store
    onChange[$key]=$onChange
done < <(kit settings $CWD | 
    jq -r '.data | to_entries[] | select(.value.store) | '$(
        kit jq-bsv .key .value.store .value.trpcOnChangeSubscription
    ) | sed 's/\bnull\b//g'
)

LF=@LF@
AtItemList=$(array --map 'string --capitalize --prepend At' --join ' \& ' -- ${KEYS[@]})
for key in ${KEYS[@]}; do
    storePath=
    importStore=
    importSetOnChange=
    setterList+="   ...${key}Setter(set),$LF"
    importStore=${key}Setter,
    [ ${store[$key]} ] && storePath='' || storePath=${store[$key]//\//\\\/}
    if [ ${onChange[$key]} ]; then
        trpcOnChangeList+="        ...Set${key^}OnChange,$LF"
        importSetOnChange=Set${key^}OnChange
    fi
    importList+="import { At${key^}, $importStore$importSetOnChange} from \'.\/@${key}${storePath}\'$LF"
done

sedOptions=(
    -e "s/\$AtItemList/$AtItemList/"
    -e "s/^\s*\$importList/$importList/"
    -e "s/^\s*\$setterList,/$setterList/"
    -e "s/^\s*\$trpcOnChangeList,/$trpcOnChangeList/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $CWD/$BASE.src.ts | 
    CWD=$CWD kit filter |
    kit prettier > $CWD/../$BASE.ts
