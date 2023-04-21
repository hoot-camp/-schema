import trpc from 'go.vote/@trpc'
import { set } from './config'
export const tSet = trpc.kitSchema[set]
