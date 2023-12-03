import * as React from 'react'
import Board from './components/board'
import Actions from './components/actions'
import useActionManager from './manager/hooks/useActionManager'
import { Stack } from '@mui/system'

const Layout: React.FunctionComponent = () => {
    const actions = useActionManager()
    return (
        <Stack direction="column" spacing={2}>
            <Board arrState={actions.arrState} />
            <Actions {...actions} />
        </Stack>
    )
}

export default Layout
