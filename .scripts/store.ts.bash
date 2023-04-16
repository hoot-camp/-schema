DIR=$(dirname $(realpath $BASH_SOURCE))
BASE_NOEXT=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A setter
declare -A onChange
while IFS='|' read -r key setter onChange; do
	KEYS+=($key)
    setter[$key]=$setter
    onChange[$key]=$onChange
done < <(kit settings $DIR | 
    jq -r '.data | to_entries[] | select(.value.data == null) | '$(
        kit jq-bsv .key .value.setter .value.trpcOnChangeSubscription
    ) | sed 's/\bnull\b//g'
)

LF=@LF@
AtItemList=$(array --map 'string --capitalize --prepend At' --join ' \& ' -- ${KEYS[@]})
for key in ${KEYS[@]}; do
    setterPath=
    importSetter=
    importSetOnChange=
    if [ ${setter[$key]} ]; then
        setterList+="   ...${key}Setter(set),$LF"
        importSetter=${key}Setter,
        [[ ${setter[$key]} = 'true' ]] && setterPath='' || setterPath=${setter[$key]//\//\\\/}
    fi
    if [ ${onChange[$key]} ]; then
        trpcOnChangeList+="        ...Set${key^}OnChange,$LF"
        importSetOnChange=Set${key^}OnChange
    fi
    importList+="import { At${key^}, $importSetter$importSetOnChange} from \'.\/@${key}${setterPath}\'$LF"
done

sedOptions=(
    -e "s/\$AtItemList/$AtItemList/"
    -e "s/^\s*\$importList/$importList/"
    -e "s/^\s*\$setterList,/$setterList/"
    -e "s/^\s*\$trpcOnChangeList,/$trpcOnChangeList/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $DIR/$BASE_NOEXT.src.ts | 
    SETTINGS_DIR=$DIR kit filter-source |
    kit prettier > $DIR/../$BASE_NOEXT.ts
