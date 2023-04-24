SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
DATA=$(pathname data-key $CWD)

declare -A trpc
declare -A trpcRouter
while IFS='|' read -r key trpc trpcRouter; do
	KEYS+=($key)
    trpc[$key]=$trpc
    trpcRouter[$key]=$trpcRouter
done < <(kit settings $CWD | 
    kit jq --data $DATA --select '.trpc or .trpcRouter' -- .key .trpc .trpcRouter | 
    sed 's/\bnull\b//g'
)

sedOptions=()
onChageSubscription=$(kit settings $CWD | jq -r "$DATA | select(.trpcOnChangeSubscription)" | wc -l)
if [ $onChageSubscription -eq 0 ]; then
    sedOptions+=(-e "/import { trpcOnChangeRoute/d")
    sedOptions+=(-e "/import { name as emitName/d")
    sedOptions+=(-e "/trpcOnChangeRoute/d")
fi

LF=@LF@

importRouters=()
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

sedOptions+=(
    -e "s/\$importRouters/$importRoutersSrc/"
    -e "s/\$importItemRoutes/$importRoutesSrc/"
    -e "s/^\s*\$trpcRouters,/$trpcRoutersSrc/"
    -e "s/^\s*\$trpcRoutes,/$trpcRoutesSrc/"
    -e "s/$LF/\n/g"
)

sed "${sedOptions[@]}" $SRC/$BASE.src.ts | 
    kit filter --cwd $CWD |
    kit write --kit-export --prettier --cwd $CWD --base $BASE --format ts
