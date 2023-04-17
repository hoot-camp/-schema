CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

declare -A trpc
declare -A trpcRouter
while IFS='|' read -r key trpc trpcRouter; do
	KEYS+=($key)
    trpc[$key]=$trpc
    trpcRouter[$key]=$trpcRouter
done < <(kit settings $CWD/../settings.ts | 
    jq -r "$(kit jq-data-select .trpc or .trpcRouter) | $(kit jq-bsv .key .trpc .trpcRouter)" | 
    sed 's/\bnull\b//g'
)

LF=@LF@

trpcRouters=()
trpcRoutes=("...\$dataRoute,")
for key in ${KEYS[@]}; do
    if [ ${trpcRouter[$key]} ] ; then
        trpcRouterPath=${trpcRouter[$key]//\//\\\/}
        importRouters+=("import { trpcRouter as $key } from '.\/$key$trpcRouterPath\'")
        trpcRouters+=("$key,")
    fi
    if [ ${trpc[$key]} ]; then
        trpcPath=${trpc[$key]//\//\\\/}
        importRoutes+=("import { set${key^}Route } from '.\/@$key$trpcPath\'")
        trpcRoutes+=("...set${key^}Route,")
    fi
done

importRoutersSrc=$(array --join $LF -- "${importRouters[@]}")
importRoutesSrc=$(array --join $LF -- "${importRoutes[@]}")
trpcRoutersSrc=$(array --join $LF -- "${trpcRouters[@]}")
trpcRoutesSrc=$(array --join $LF -- "${trpcRoutes[@]}")

sedOptions=(
    -e "s/\$importRouters/$importRoutersSrc/"
    -e "s/\$importItemRoutes/$importRoutesSrc/"
    -e "s/^\s*\$trpcRouters,/$trpcRoutersSrc/"
    -e "s/^\s*\$trpcRoutes,/$trpcRoutesSrc/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $CWD/$BASE.src.ts | 
    kit filter --cwd $CWD |
    kit prettier > $CWD/../$BASE.ts
