import { Dispatch, SetStateAction } from 'react'

export interface IActionManager {
    currentRound: number
    arrState: string[][]
    delay: number
    affinity: number
    setCurrentRound: Dispatch<SetStateAction<number>>
    setArrState: Dispatch<SetStateAction<string[][]>>
    setDelay: Dispatch<SetStateAction<number>>
    setAffinity: Dispatch<SetStateAction<number>>
}
