SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
subschema=$(pathname subschema $CWD)
DATA=$(string --plural -- $subschema)
kit create-table --cwd $CWD | kit sql-formatter |
    kit write --cwd $CWD --base $DATA.0.procedure --format sql
