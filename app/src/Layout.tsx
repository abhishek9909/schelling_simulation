import * as React from 'react'
import Board from './components/board'
import Buttons from './components/actions'

const Layout: React.FunctionComponent = () => {
    return (
        <div>
            <Board
                arrState={[
                    ['#ff0000', '#ff0000'],
                    ['#0000ff', '#0000ff'],
                ]}
            />
            <Buttons />
        </div>
    )
}

export default Layout
