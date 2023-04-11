import { $DatumData } from './dataTypes/data'

export type $DatumMainStore = {
    $data: Array<$DatumData>
    $keyToIndex: { [key: number]: number }
    chosen: number
}
