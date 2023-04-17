CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

kit filter --cwd $CWD --with-key $BASE.src.ts | kit prettier > $CWD/../$BASE.ts
