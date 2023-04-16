import type { Flat } from 'go.vote/@/types'
import { D6 } from './@d6'
import { Sub } from './@sub'
import { OfficeCode } from './@officeCode'
import { SeatCode } from './@seatCode'

export type Keys = Flat<D6 & Sub & OfficeCode & SeatCode>
