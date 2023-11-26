import { Button, Stack } from '@mui/material'
import * as React from 'react'

const Buttons: React.FunctionComponent = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined">Reset</Button>
            <Button variant="outlined">Start</Button>
            <Button variant="outlined" disabled>
                Pause
            </Button>
            <Button variant="outlined">Step</Button>
        </Stack>
    )
}

export default Buttons
