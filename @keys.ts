import { compositeKeys } from "go.vote/@/helpers"
import type { Flat } from "go.vote/@/types"
import { D6 } from "./@d6"
import { Sub } from "./@sub"
import { OfficeCode } from "./@officeCode"
import { SeatCode } from "./@seatCode"

export type Keys = Flat<D6 & Sub & OfficeCode & SeatCode>

export const composite = ({
    d6,
    sub = "",
    officeCode = "",
    seatCode = 0,
}: Keys): string => compositeKeys(d6, sub, officeCode, seatCode)

