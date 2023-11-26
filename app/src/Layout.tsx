import * as React from 'react'
import Board from './components/board'
import Buttons from './components/actions'

const Layout: React.FunctionComponent = () => {
    return (
        <div>
            <Board />
            <Buttons />
        </div>
    )
}

export default Layout
