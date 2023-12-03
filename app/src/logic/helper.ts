import { AgentStrategy } from '../manager/types'

export const calculateEmptyPercentage = (arrState: string[][]): number => {
    let num = 0
    arrState.forEach((row) => {
        row.forEach((cell) => {
            if (cell == '') {
                num = num + 1
            }
        })
    })
    return (num / (arrState.length * arrState.length)) * 100
}

export const calculateRedPercentage = (arrState: string[][]): number => {
    let num = 0
    let nonempty = 0
    arrState.forEach((row) => {
        row.forEach((cell) => {
            if (cell) {
                nonempty = nonempty + 1
            }
            if (cell == '#ff0000') {
                num = num + 1
            }
        })
    })
    return (num / nonempty) * 100
}

export const prepareArrState = (
    redVsBlue: number,
    emptyPer: number,
    size: number
): string[][] => {
    const arrState: string[][] = []
    for (let i = 0; i < size; i = i + 1) {
        arrState.push([])
        for (let j = 0; j < size; j = j + 1) {
            const isEmpty = Math.random() < emptyPer / 100
            if (!isEmpty) {
                const isRed = Math.random() < redVsBlue / 100
                if (isRed) {
                    arrState[i].push('#ff0000')
                } else {
                    arrState[i].push('#0000ff')
                }
            } else {
                arrState[i].push('')
            }
        }
    }
    return arrState
}

export const calculateSatisfactionRate = (
    arrState: string[][],
    affinity: number
) => {
    let satis = 0
    let nonempty = 0
    for (let i = 0; i < arrState.length; i = i + 1) {
        for (let j = 0; j < arrState.length; j = j + 1) {
            if (arrState[i][j] !== '') {
                nonempty = nonempty + 1
                const { num, tot } = calculateSatisNumTot(arrState, i, j)
                if (tot === 0 || num / tot >= affinity / 100) {
                    satis = satis + 1
                }
            }
        }
    }
    return (satis / nonempty) * 100
}

export const progressArrState = (
    arrState: string[][],
    affinity: number,
    strategy: AgentStrategy
): string[][] => {
    // do the random vacant location by default first, lets observe.
    let emptyLocs: number[] = []
    const clonedArray = [...arrState.map((row) => [...row])]
    for (let i = 0; i < arrState.length; i = i + 1) {
        for (let j = 0; j < arrState.length; j = j + 1) {
            if (!arrState[i][j]) {
                emptyLocs.push(arrState.length * i + j)
            }
        }
    }
    for (let i = 0; i < arrState.length; i = i + 1) {
        for (let j = 0; j < arrState.length; j = j + 1) {
            if (arrState[i][j]) {
                const { num, tot } = calculateSatisNumTot(arrState, i, j)
                if (num / tot < affinity / 100) {
                    if (strategy === AgentStrategy.Random) {
                        if (emptyLocs.length) {
                            const rIdx = Math.floor(
                                Math.random() * emptyLocs.length
                            )
                            const rNum = emptyLocs[rIdx]
                            const pos_x = Math.floor(rNum / arrState.length)
                            const pos_y = rNum % arrState.length
                            emptyLocs = emptyLocs.filter((val) => val !== rNum)
                            clonedArray[i][j] = ''
                            clonedArray[pos_x][pos_y] = arrState[i][j]
                        }
                    } else if (strategy === AgentStrategy.Nearest) {
                        if (emptyLocs.length) {
                            const clonedEmptyLocs = [...emptyLocs]
                            clonedEmptyLocs.sort((c1, c2) => {
                                const x1 = Math.floor(c1 / arrState.length)
                                const y1 = c1 % arrState.length
                                const x2 = Math.floor(c2 / arrState.length)
                                const y2 = c2 % arrState.length
                                const d1 =
                                    (x1 - i) * (x1 - i) + (y1 - j) * (y1 - j)
                                const d2 =
                                    (x2 - i) * (x2 - i) + (y2 - j) * (y2 - j)
                                return d1 - d2
                            })
                            const rNum = clonedEmptyLocs[0]
                            const pos_x = Math.floor(rNum / arrState.length)
                            const pos_y = rNum % arrState.length
                            emptyLocs = emptyLocs.filter((val) => val !== rNum)
                            clonedArray[i][j] = ''
                            clonedArray[pos_x][pos_y] = arrState[i][j]
                        }
                    } else {
                        if (emptyLocs.length) {
                            const clonedEmptyLocs = [...emptyLocs]
                            clonedEmptyLocs.sort((c1, c2) => {
                                const x1 = Math.floor(c1 / arrState.length)
                                const y1 = c1 % arrState.length
                                const x2 = Math.floor(c2 / arrState.length)
                                const y2 = c2 % arrState.length
                                const s1 = calculateSatisNumTot(
                                    arrState,
                                    x1,
                                    y1,
                                    arrState[i][j]
                                )
                                const s2 = calculateSatisNumTot(
                                    arrState,
                                    x2,
                                    y2,
                                    arrState[i][j]
                                )
                                return s1.num * s2.tot - s1.tot * s2.num
                            })
                            const rNum =
                                clonedEmptyLocs[clonedEmptyLocs.length - 1]
                            const pos_x = Math.floor(rNum / arrState.length)
                            const pos_y = rNum % arrState.length
                            emptyLocs = emptyLocs.filter((val) => val !== rNum)
                            clonedArray[i][j] = ''
                            clonedArray[pos_x][pos_y] = arrState[i][j]
                        }
                    }
                }
            }
        }
    }
    return clonedArray ?? arrState
}

const calculateSatisNumTot = (
    arrState: string[][],
    i: number,
    j: number,
    zeroGame?: string
) => {
    let num = 0
    let tot = 0
    if (i - 1 >= 0) {
        if (arrState[i - 1][j] === (zeroGame ?? arrState[i][j])) {
            num = num + 1
        }
        if (arrState[i - 1][j]) {
            tot = tot + 1
        }
    }
    if (i + 1 < arrState.length) {
        if (arrState[i + 1][j] === (zeroGame ?? arrState[i][j])) {
            num = num + 1
        }
        if (arrState[i + 1][j]) {
            tot = tot + 1
        }
    }
    if (j + 1 < arrState.length) {
        if (arrState[i][j + 1] === (zeroGame ?? arrState[i][j])) {
            num = num + 1
        }
        if (arrState[i][j + 1]) {
            tot = tot + 1
        }
    }
    if (j - 1 >= 0) {
        if (arrState[i][j - 1] === (zeroGame ?? arrState[i][j])) {
            num = num + 1
        }
        if (arrState[i][j - 1]) {
            tot = tot + 1
        }
    }
    return { num, tot }
}

/**
 * 1. Any random vacant place selection.
 * 2. Nearest vacant location for the dissatisfied agent.
 * 3. Greedy choice of vacant location for the agent.
 */
