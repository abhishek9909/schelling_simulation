import {
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Slider,
    Stack,
} from '@mui/material'
import * as React from 'react'
import { AgentStrategy, IActionManager } from '../../../manager/types'
import {
    calculateEmptyPercentage,
    calculateRedPercentage,
    prepareArrState,
} from '../../../logic/helper'

interface IPopupProps extends IActionManager {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup: React.FunctionComponent<IPopupProps> = ({
    isOpen,
    arrState,
    delay,
    affinity,
    strategy,
    setIsOpen,
    setDelay,
    setAffinity,
    setArrState,
    setCurrentRound,
    setStrategy,
}) => {
    const [nativeDelay, setNativeDelay] = React.useState<number>(delay)
    const [emptyPer, setEmptyPer] = React.useState<number>(
        calculateEmptyPercentage(arrState)
    )
    const [size, setSize] = React.useState<number>(arrState.length)
    const [similarity, setSimilarity] = React.useState<number>(affinity)
    const [redVsBlue, setRedVsBlue] = React.useState<number>(
        calculateRedPercentage(arrState)
    )
    const [nativeStrategy, setNativeStrategy] =
        React.useState<AgentStrategy>(strategy)

    const _onApplyClick = () => {
        setDelay(nativeDelay)
        setAffinity(similarity)
        setCurrentRound(0)
        setArrState(prepareArrState(redVsBlue, emptyPer, size))
        setIsOpen(false)
        setStrategy(nativeStrategy)
    }

    const _onCloseClick = () => {
        setNativeDelay(delay)
        setNativeStrategy(strategy)
        setSimilarity(affinity)
        setEmptyPer(calculateEmptyPercentage(arrState))
        setRedVsBlue(calculateRedPercentage(arrState))
        setSize(arrState.length)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onClose={_onCloseClick}>
            <DialogTitle>Attributes</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ActionItem
                    currentValue={similarity}
                    templateString="Similarity: {value}"
                    handleSetChange={setSimilarity}
                />
                <ActionItem
                    currentValue={redVsBlue}
                    templateString="RedVsBlue: {value}/{100nvalue}%"
                    handleSetChange={setRedVsBlue}
                />
                <ActionItem
                    currentValue={emptyPer}
                    templateString="Empty Percentage: {value}%"
                    handleSetChange={setEmptyPer}
                />
                <ActionItem
                    currentValue={size}
                    templateString="Dimensions: {value}x{value}"
                    handleSetChange={setSize}
                />
                <ActionItem
                    currentValue={nativeDelay}
                    templateString="Delay: {value} ms"
                    handleSetChange={setNativeDelay}
                />
                <FormControl>
                    <FormLabel>Strategy</FormLabel>
                    <RadioGroup
                        value={nativeStrategy}
                        onChange={(ev) => {
                            const stringValue = (
                                event?.target as HTMLInputElement
                            ).value
                            setNativeStrategy(stringValue as AgentStrategy)
                        }}
                    >
                        <FormControlLabel
                            value={AgentStrategy.Random}
                            label="random"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value={AgentStrategy.Greedy}
                            label="greedy"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value={AgentStrategy.Nearest}
                            label="nearest"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </FormControl>
            </List>
            <Button variant="outlined" onClick={_onApplyClick}>
                Apply
            </Button>
        </Dialog>
    )
}

interface IActionItemProps {
    currentValue: number
    templateString: string
    handleSetChange: React.Dispatch<React.SetStateAction<number>>
}

const ActionItem: React.FunctionComponent<IActionItemProps> = ({
    currentValue,
    templateString,
    handleSetChange,
}) => {
    return (
        <ListItem>
            <Stack direction="row">
                <div>
                    {templateString
                        .replaceAll('{value}', currentValue.toString())
                        .replaceAll(
                            '{100nvalue}',
                            (100 - currentValue).toString()
                        )}
                </div>
                <Slider
                    defaultValue={currentValue}
                    onChange={(_, val) => {
                        if (!Array.isArray(val)) {
                            handleSetChange(val)
                        }
                    }}
                    max={100}
                ></Slider>
            </Stack>
        </ListItem>
    )
}

export default Popup
