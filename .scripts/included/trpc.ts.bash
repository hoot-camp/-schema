CWD=$(dirname $(realpath $BASH_SOURCE))
BASE=$(basename $BASH_SOURCE | cut -d. -f1)

schema=$(pathname schema $CWD)
subschema=$(pathname subschema $CWD)
if [ $schema != $subschema ]; then
    cat <<< "export const name = '$schema.$subschema'" > $CWD/../name.ts
    sedOptions=(-e "s/go\.vote\/${schema^}.*\/settings/.\/name/")
else
    sedOptions=(-e '')
fi

kit filter --cwd $CWD --with-key --with-sql $BASE.src.ts | sed "${sedOptions[@]}" > $CWD/../$BASE.ts
