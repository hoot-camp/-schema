CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
kit filter --with-key --cwd $CWD $BASE.src.ts > $CWD/../$BASE.ts
