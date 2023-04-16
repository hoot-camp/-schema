export const officeCode = "officeCode"
export type OfficeCode = {
    /**
     * @item.type string
     * @description KEY
     */
    [officeCode]?: string
}
export type OfficeCodeValue = OfficeCode[typeof officeCode]

