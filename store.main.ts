import { $DatumData } from './dataTypes/data'

export type $DatumMainStore = {
    $data: Array<$DatumData>
    $keyListToIndex: { [key: string]: number }
    chosen: number
}
