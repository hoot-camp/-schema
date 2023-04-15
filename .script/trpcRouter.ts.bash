DIR=$(dirname ${BASH_SOURCE[0]})

declare -A usage
declare -A trpcRoute
while IFS='|' read -r key usage trpcRoute; do
	KEYS+=($key)
    usage[$key]=$usage
    trpcRoute[$key]=$trpcRoute
done < <(kit settings $DIR/../settings.ts | 
    jq -r ' .fields | to_entries[]  | '$(
        kit jq-bsv .key .value.usage .value.trpcRoute
    ) | sed 's/\bnull\b//g'
)

LF=@LF@

for key in ${KEYS[@]}; do
    if [ "${usage[$key]}" = 'subSchema' ]; then
        importRouters+="import { trpcRouter as $key } from '.\/$key\/trpcRouter\'$LF"
        trpcRouters+="    $key,$LF"
    fi
    if [ "${usage[$key]}" = 'item' ] && [ ${trpcRoute[$key]} ]; then
        trpcRoutePath=${trpcRoute[$key]//\//\\\/}
        importItemRoutes+="import { set${key^}Route } from '.\/@${key}${trpcRoutePath}\'$LF"
        trpcRoutes+="    ...set${key^}Route,$LF"
    fi
done

sedOptions=(
    -e "s/\$importRouters/$importRouters/"
    -e "s/\$importItemRoutes/$importItemRoutes/"
    -e "s/^\s*\$trpcRouters,/$trpcRouters/"
    -e "s/^\s*\$trpcRoutes,/$trpcRoutes/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $DIR/trpcRouter.src.ts
