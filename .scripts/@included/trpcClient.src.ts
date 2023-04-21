import trpc from 'go.vote/@trpc'
import { set$Included } from './config'
export const tSet$Included = trpc.$dotPath[set$Included]
