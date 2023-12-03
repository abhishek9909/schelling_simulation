import { Dispatch, SetStateAction } from 'react'

export interface IActionManager {
    currentRound: number
    arrState: string[][]
    delay: number
    affinity: number
    strategy: AgentStrategy
    setStrategy: Dispatch<SetStateAction<AgentStrategy>>
    setCurrentRound: Dispatch<SetStateAction<number>>
    setArrState: Dispatch<SetStateAction<string[][]>>
    setDelay: Dispatch<SetStateAction<number>>
    setAffinity: Dispatch<SetStateAction<number>>
}

export enum AgentStrategy {
    Random = 'Random',
    Greedy = 'Greedy',
    Nearest = 'Nearest',
}
