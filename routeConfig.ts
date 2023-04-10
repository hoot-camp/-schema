import { SalesGraph } from 'go.vote/@asset'
import { Selectables } from 'go.vote/Content/Selectables'
import { List } from 'go.vote/Explorer/List'
import { Inspector } from './Inspector'
import { name } from './settings'

export const Icon: React.FC<{}> = SalesGraph

const masterPath = '/master/' + name + '/list'
export const activityMasterRoute = {
    path: masterPath,
    to: masterPath,
    Icon,
    label: '$Module Master',
    Content: Selectables,
}

const $moduleList = [
    [1, 'List 1'],
    [2, 'List 2'],
]

export const explorerMasterRoute = {
    path: masterPath + '/:list?',
    pathname: masterPath + '/',
    data: $moduleList,
    Component: List,
}

const collectionPath = '/' + name

export const libraryRoute = {
    path: collectionPath + '/:$key',
    Component: Inspector,
}

export const collectionRoute = {
    path: collectionPath,
    Icon,
    label: name,
    Library: null,
}
