import { Button, Stack } from '@mui/material'
import * as React from 'react'
import { IActionManager } from '../../manager/types'
import Popup from './popup'
import {
    calculateEmptyPercentage,
    calculateRedPercentage,
    calculateSatisfactionRate,
    progressArrState,
} from '../../logic/helper'

const Actions: React.FunctionComponent<IActionManager> = (actions) => {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = React.useState(false)
    const _onResetClick = () => {
        setIsPopupOpen(true)
    }
    const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null)

    const _onStartClick = () => {
        setIsSimulationRunning(true)
        const nativeTimer = setInterval(() => {
            actions.setArrState((arrState) =>
                progressArrState(arrState, actions.affinity)
            )
            actions.setCurrentRound((rnd) => rnd + 1)
        })
        setTimer(nativeTimer)
        // start an interval function.
    }

    const _onPauseClick = () => {
        setIsSimulationRunning(false)
        if (timer != null) {
            clearInterval(timer)
            setTimer(null)
        }
    }

    const _onStepClick = () => {
        _onPauseClick()
        actions.setArrState((arrState) =>
            progressArrState(arrState, actions.affinity)
        )
        actions.setCurrentRound((rnd) => rnd + 1)
    }

    React.useEffect(() => {
        const satisRate = calculateSatisfactionRate(
            actions.arrState,
            actions.affinity
        )
        if (satisRate === 100) {
            _onPauseClick()
        }
    }, [actions.arrState, actions.affinity])

    return (
        <div>
            {isPopupOpen && (
                <Popup
                    {...actions}
                    isOpen={isPopupOpen}
                    setIsOpen={setIsPopupOpen}
                />
            )}
            <Stack direction="column" spacing={4}>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        disabled={isSimulationRunning}
                        onClick={_onResetClick}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={isSimulationRunning}
                        onClick={_onStartClick}
                    >
                        Start
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={!isSimulationRunning}
                        onClick={_onPauseClick}
                    >
                        Pause
                    </Button>
                    <Button variant="outlined" onClick={_onStepClick}>
                        Step
                    </Button>
                </Stack>
                <div>Attributes</div>
                <Stack direction="row" spacing={2}>
                    <AttributeItem
                        value={actions.currentRound}
                        templateString="Round: {value}"
                    ></AttributeItem>
                    <AttributeItem
                        value={calculateSatisfactionRate(
                            actions.arrState,
                            actions.affinity
                        )}
                        templateString="Satisfaction: {value}%"
                    ></AttributeItem>
                    <AttributeItem
                        value={actions.affinity}
                        templateString="Affinity: {value}"
                    />
                    <AttributeItem
                        value={calculateEmptyPercentage(actions.arrState)}
                        templateString="Empty: {value}%"
                    />
                    <AttributeItem
                        value={calculateRedPercentage(actions.arrState)}
                        templateString="Red vs Blue: {value}/{100nvalue}%"
                    />
                    <AttributeItem
                        value={actions.delay}
                        templateString="Delay: {value}%"
                    />
                    <AttributeItem
                        value={actions.arrState.length}
                        templateString="Size: {value}x{value}"
                    />
                </Stack>
            </Stack>
        </div>
    )
}

export default Actions

interface IAttributeItemProps {
    value: number
    templateString: string
}

const AttributeItem: React.FunctionComponent<IAttributeItemProps> = ({
    value,
    templateString,
}) => (
    <div>
        {templateString
            .replaceAll('{value}', value.toString())
            .replaceAll('{100nvalue}', (100 - value).toString())}
    </div>
)

/**
 * Start:
 *  Sets off a function to run in interval.
 *
 * Pause:
 *  Pauses the function in the middle of execution.
 *
 */
