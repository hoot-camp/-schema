import type { $Key } from './@$key/itemTypes' //+

export type $Datum = $Key & {
    /**
     * @item.type string
     */
    name: string

    /**
     * @item.type integer
     * @minimum 0
     * @maximum 9
     * @default 0
     */
    price: number

    /**
     * @item.type timestamp
     */
    addedAt: Date
}
