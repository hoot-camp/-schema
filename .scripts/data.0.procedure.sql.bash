CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE .sql.bash)
mkdir -p $CWD/../mysql 
kit filter --cwd $CWD --with-sql $BASE.src.sql > $CWD/../mysql/$BASE.sql
