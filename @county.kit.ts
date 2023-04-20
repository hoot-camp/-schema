export const county = 'county'
export type County = {
    /**
     * @item.type number
     * @description KEY
     */
    [county]: number
}
export type CountyValue = County[typeof county]

