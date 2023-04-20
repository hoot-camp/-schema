SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
BASE=$(basename $BASH_SOURCE .sql.bash)
mkdir -p $CWD/.mysql 
kit filter --cwd $CWD --with-sql $SRC/$BASE.src.sql |
    kit write --cwd $CWD/.mysql --base $BASE --format sql
