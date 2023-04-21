SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$(dirname $(realpath $BASH_SOURCE))/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
kit filter --cwd $CWD $SRC/$BASE.src.ts |
    kit write --cwd $CWD --base $BASE --format ts