DIR=$(dirname ${BASH_SOURCE[0]})

declare -A setter
declare -A onChange
while IFS='|' read -r key setter onChange; do
	KEYS+=($key)
    setter[$key]=$setter
    onChange[$key]=$onChange
done < <(kit settings $DIR/../settings.ts | 
    jq -r '.fields | to_entries[] | select(.value.usage != "subSchema") | '$(
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

sed "${sedOptions[@]}" $DIR/store.src.ts
