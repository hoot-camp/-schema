export const sub = "sub"
export type Sub = {
    /**
     * @item.type string
     * @description KEY
     */
    [sub]: string
}
export type SubValue = Sub[typeof sub]

