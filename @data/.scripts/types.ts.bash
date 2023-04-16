DIR=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)
DIR=$DIR kit filter-source $DIR/$BASE.src.ts > $DIR/../$BASE.ts
