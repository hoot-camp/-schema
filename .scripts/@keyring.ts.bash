SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

kit filter --cwd $CWD --with-key $SRC/$BASE.src.ts | kit prettier > $CWD/$BASE.ts
