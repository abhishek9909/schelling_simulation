import * as React from 'react'
import { AgentStrategy, IActionManager } from '../types'
import { prepareArrState } from '../../logic/helper'

const useActionManager: () => IActionManager = () => {
    const [currentRound, setCurrentRound] = React.useState<number>(0)
    const [affinity, setAffinity] = React.useState<number>(50)
    const [arrState, setArrState] = React.useState<string[][]>(
        prepareArrState(50, 25, 10)
    )
    const [delay, setDelay] = React.useState<number>(100)
    const [strategy, setStrategy] = React.useState<AgentStrategy>(
        AgentStrategy.Random
    )
    return {
        currentRound: currentRound,
        arrState: arrState,
        delay: delay,
        affinity: affinity,
        strategy: strategy,
        setCurrentRound: setCurrentRound,
        setArrState: setArrState,
        setDelay: setDelay,
        setAffinity: setAffinity,
        setStrategy: setStrategy,
    }
}

export default useActionManager

/**
 * Manages the state of the entire simulation.
 *
 * Returns:
 * - The round of the simulation.
 * - The configuration of the current simulation: affinity (t%), arrState (infer: composition, empty%, size, satisfaction rate) and delay.
 */
