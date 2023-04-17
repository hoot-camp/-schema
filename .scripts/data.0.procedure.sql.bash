CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

kit filter --cwd $CWD --with-sql $BASE.0.procedure.src.sql > $CWD/../mysql/$BASE.0.procedure.sql
