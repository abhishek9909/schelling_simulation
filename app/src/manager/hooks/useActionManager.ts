import * as React from 'react'
import { IActionManager } from '../types'
import { prepareArrState } from '../../logic/helper'

const useActionManager: () => IActionManager = () => {
    const [currentRound, setCurrentRound] = React.useState<number>(0)
    const [affinity, setAffinity] = React.useState<number>(50)
    const [arrState, setArrState] = React.useState<string[][]>(
        prepareArrState(50, 25, 10)
    )
    const [delay, setDelay] = React.useState<number>(100)
    return {
        currentRound: currentRound,
        arrState: arrState,
        delay: delay,
        affinity: affinity,
        setCurrentRound: setCurrentRound,
        setArrState: setArrState,
        setDelay: setDelay,
        setAffinity: setAffinity,
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
