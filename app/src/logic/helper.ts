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
                let num = 0
                let tot = 0
                if (i - 1 >= 0) {
                    if (arrState[i - 1][j] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i - 1][j]) {
                        tot = tot + 1
                    }
                }
                if (i + 1 < arrState.length) {
                    if (arrState[i + 1][j] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i + 1][j]) {
                        tot = tot + 1
                    }
                }
                if (j + 1 < arrState.length) {
                    if (arrState[i][j + 1] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i][j + 1]) {
                        tot = tot + 1
                    }
                }
                if (j - 1 >= 0) {
                    if (arrState[i][j - 1] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i][j - 1]) {
                        tot = tot + 1
                    }
                }
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
    affinity: number
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
                let num = 0
                let tot = 0
                if (i - 1 >= 0) {
                    if (arrState[i - 1][j] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i - 1][j]) {
                        tot = tot + 1
                    }
                }
                if (i + 1 < arrState.length) {
                    if (arrState[i + 1][j] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i + 1][j]) {
                        tot = tot + 1
                    }
                }
                if (j + 1 < arrState.length) {
                    if (arrState[i][j + 1] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i][j + 1]) {
                        tot = tot + 1
                    }
                }
                if (j - 1 >= 0) {
                    if (arrState[i][j - 1] === arrState[i][j]) {
                        num = num + 1
                    }
                    if (arrState[i][j - 1]) {
                        tot = tot + 1
                    }
                }
                if (num / tot < affinity / 100) {
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
                }
            }
        }
    }
    return clonedArray ?? arrState
}

/**
 * 1. Any random vacant place selection.
 * 2. Nearest vacant location for the dissatisfied agent.
 * 3. Greedy choice of vacant location for the agent.
 */
