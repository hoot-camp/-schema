export const $key = '$key'
export type $Key = {
    /**
     * @item.type $type
     * @description KEY
     */
    [$key]: $type
}
export type $KeyValue = $Key[typeof $key]
