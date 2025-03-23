function Gameboard() {
    const rows = 3
    const columns = 3
    const board = []

    //Creates a 3x3 2D array 
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

    const makeMove = (row, column, player) => {
        const targetCell = board[row][column]

        if (targetCell.getValue() === 0) {
            targetCell.addToken(player)
            return true
        }
        else {
            return false
        }
    }

    const getBoard = () => board

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues)
    }

    return { getBoard, makeMove, printBoard }
}


/*
** Cell == square in the board
** cell's state: 
** 0: empty
** 1: Player's one token
** 2: Player's two token
*/
function Cell() {
    let value = 0

    //Accept players' token to change the value of the cell
    const addToken = (player) => {
        if (value === 0) {
            value = player
            return true
        }

    }

    const getValue = () => value

    return { addToken, getValue }
}

function gameController(playerOne = "Player One", playerTwo = "Player Two") {
    const board = Gameboard()

    const players = [
        {
            name: playerOne,
            token: 1
        },
        {
            name: playerTwo,
            token: 2
        }
    ]

    //Player One will start the game
    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn`)
    }

    const playRound = (row, column) => {
        const moveSuccessful = board.makeMove(row, column, getActivePlayer().token)
        if (moveSuccessful) {
            switchPlayerTurn()
            printNewRound()
        }
        else {
            console.log("Invalid move, the cell is occupied")
        }
    }

    return { playRound, getActivePlayer }
}

const game = gameController()