export const dv = 'dv'
export type Dv = {
    /**
     * @item.type string
     * @description KEY
     */
    [dv]: string
}
export type DvValue = Dv[typeof dv]

