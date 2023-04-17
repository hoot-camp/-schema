CWD=$(dirname $(realpath $BASH_SOURCE))

subSchema=$(pathname sub-schema $CWD)
[ $subSchema = '.kit-schema' ] && subSchema=schema
data=$(string --plural -- $subSchema)
target=$CWD/../@${data,}/.scripts
mkdir -p $target
path=$(realpath --relative-to=$(pwd) $target)
degit hoot-camp/-data $path