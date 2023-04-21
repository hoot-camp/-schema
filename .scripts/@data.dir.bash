SRC=$(dirname $(realpath $BASH_SOURCE))
: ${CWD:=$(dirname $(realpath $BASH_SOURCE))/..}
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

subSchema=$(pathname sub-schema $CWD)
[ $subSchema = '.kit-schema' ] && subSchema=schema
data=$(string --plural -- $subSchema)
DATA=${data,}
sourceDir=$KIT_SCRIPTS/$BASE
target=$CWD/@$DATA
mkdir -p $target

echo $sourceDir/*.bash | 
    xargs -n1 basename -s .bash -a | 
    xargs -I {} kit script $BASE/{} --cwd $CWD --data $DATA