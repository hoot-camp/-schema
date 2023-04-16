export const seatCode = "seatCode"
export type SeatCode = {
    /**
     * @item.type number
     * @description KEY
     */
    [seatCode]: number
}
export type SeatCodeValue = SeatCode[typeof seatCode]

