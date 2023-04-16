DIR=$(dirname $(realpath $BASH_SOURCE))

subSchema=$(pathname sub-schema $DIR)
[ $subSchema = '.kit-schema' ] && subSchema=schema
data=$(string --plural -- $subSchema)
target=$DIR/../@$data/.scripts
mkdir -p $target
path=$(realpath --relative-to=$(pwd) $target)
degit hoot-camp/-data $path