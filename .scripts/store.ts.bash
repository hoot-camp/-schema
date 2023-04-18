CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
DATA=$(pathname data-key $CWD)

declare -A store
declare -A onChange
while IFS='|' read -r key store onChange; do
	KEYS+=($key)
    store[$key]=$store
    onChange[$key]=$onChange
done < <(kit settings $CWD | 
    jq -r "$(kit jq --data $DATA --select .store -- .key .store .trpcOnChangeSubscription)" |
    sed 's/\bnull\b//g'
)

ON_CHANGE=
AtItemList=$(array --map 'string --capitalize --prepend At' --join ' \& ' -- ${KEYS[@]})
importList=("import { At\$Data, \$dataSetter } from \'.\/@\$data\/store\'")
setterList=("...\$dataSetter(set),")
for key in ${KEYS[@]}; do
    storePath=
    importStore=
    importSetOnChange=
    setterList+=("...${key}Setter(set),")
    importStore=${key}Setter,
    [ ${store[$key]} = 'true' ] && storePath='' || storePath=${store[$key]//\//\\\/}
    if [ ${onChange[$key]} ]; then
        ON_CHANGE=true
        trpcOnChangeList+=("...Set${key^}OnChange,")
        importSetOnChange=Set${key^}OnChange
    fi
    importList+=("import { At${key^}, $importStore$importSetOnChange} from \'.\/@${key}${storePath}\'")
done

LF=@@LF@@
setterListSrc=$(array --join $LF -- "${setterList[@]}")
trpcOnChangeListSrc=$(array --join $LF -- "${trpcOnChangeList[@]}")
importListSrc=$(array --join $LF -- "${importList[@]}")
sedOptions=(-z)
sedOptions+=(
    -e "s/\$AtItemList/$AtItemList/"
    -e "s/\(\s*\)\$importList/\1$importListSrc/"
    -e "s/\(\s*\)\$setterList,/\1$setterListSrc/"
    -e "s/\(\s*\)\$trpcOnChangeList,/\1$trpcOnChangeListSrc/"
    -e "s/$LF/\\n/g"
)

if [ ! $ON_CHANGE ]; then
  sedOptions+=(-e "s/import { trpcSubscribers .*@trpc\/helpers'\s*//")
  sedOptions+=(-e "s/export const trpc\$SubSchemaOnChangeSubscribers.*\})//")
fi

sed "${sedOptions[@]}" $CWD/$BASE.src.ts | kit filter --cwd $CWD | kit prettier > $CWD/../$BASE.ts
