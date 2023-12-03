import * as React from 'react'
import Table from '@mui/material/Table'
import { Paper, TableCell, TableContainer, TableRow } from '@mui/material'

interface IBoardProps {
    arrState: string[][] // 2D array of strings, each representing a color.
}

const Board: React.FunctionComponent<IBoardProps> = ({ arrState }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                {arrState.map((row) => (
                    <TableRow>
                        {row.map((cell) => (
                            <TableCell
                                style={{
                                    background: cell ?? '#fff',
                                    border: '1px solid black',
                                }}
                            />
                        ))}
                    </TableRow>
                ))}
            </Table>
        </TableContainer>
    )
}

export default Board
