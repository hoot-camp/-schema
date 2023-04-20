SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
kit filter --cwd $CWD $SRC/$BASE.src.ts | 
    kit write --kit --prettier --cwd $CWD --base $BASE --format ts
