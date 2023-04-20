export const ix = 'ix'
export type Ix = {
    /**
     * @item.type number
     * @description KEY
     */
    [ix]: number
}
export type IxValue = Ix[typeof ix]

