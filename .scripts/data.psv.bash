SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$SRC/..}
subschema=$(pathname subschema $CWD)
DATA_KEY=$(pathname data-key $CWD)
DATA=$(string --plural -- $subschema)
kit settings $CWD | 
    kit jq --data $DATA_KEY -- .key | 
    xargs  echo | tr ' ' '|' |
    kit write --cwd $CWD --base $DATA --format psv
