DIR=$(dirname $(realpath $BASH_SOURCE))
BASE_NOEXT=$(basename $BASH_SOURCE | cut -d. -f1)

cat $DIR/$BASE_NOEXT.src.ts | DIR=$DIR kit filter-source | kit prettier > $DIR/../$BASE_NOEXT.ts
