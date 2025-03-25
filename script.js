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
** Cell's state: 
** 0: Empty
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
        const currentBoard = board.getBoard()
        const player = getActivePlayer()
        let fullCellCounter = 0

        if (moveSuccessful) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (currentBoard[i][j].getValue() !== 0) { fullCellCounter++ }
                }
            }
            if (row === column || row + column === 2) {
                if (currentBoard[0][0].getValue() === player.token
                    && currentBoard[1][1].getValue() === player.token
                    && currentBoard[2][2].getValue() === player.token) {
                    board.printBoard()
                    console.log(`${player.name} is the winner`)
                    return true
                }
                else if (currentBoard[0][2].getValue() === player.token
                    && currentBoard[1][1].getValue() === player.token
                    && currentBoard[2][0].getValue() === player.token) {
                    board.printBoard()
                    console.log(`${player.name} is the winner`)
                    return true
                }
                else if (currentBoard[row][0].getValue() === player.token
                    && currentBoard[row][1].getValue() === player.token
                    && currentBoard[row][2].getValue() === player.token) {
                    board.printBoard()
                    console.log(`${player.name} is the winner`)
                    return true
                } else if (currentBoard[0][column].getValue() === player.token
                    && currentBoard[1][column].getValue() === player.token
                    && currentBoard[2][column].getValue() === player.token) {
                    board.printBoard()
                    console.log(`${player.name} is the winner`)
                    return true
                }
                else if (fullCellCounter === 9) {
                    board.printBoard()
                    console.log("It's a draw!!")
                    return false
                }
            } else if (currentBoard[row][0].getValue() === player.token
                && currentBoard[row][1].getValue() === player.token
                && currentBoard[row][2].getValue() === player.token) {

                board.printBoard()
                console.log(`${player.name} is the winner`)
                return true
            } else if (currentBoard[0][column].getValue() === player.token
                && currentBoard[1][column].getValue() === player.token
                && currentBoard[2][column].getValue() === player.token) {
                board.printBoard()
                console.log(`${player.name} is the winner`)
                return true
            }
            else if (fullCellCounter === 9) {
                board.printBoard()
                console.log("It's a draw!!")
                return false
            }
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


//This function is for testing edge cases
// function runTestCases() {
//     console.log("==== TEST 1: Player wins on top row ====");
//     let game1 = gameController();
//     game1.playRound(0, 0);
//     game1.playRound(1, 0);
//     game1.playRound(0, 1);
//     game1.playRound(1, 1); 
//     game1.playRound(0, 2); 

//     console.log("\n==== TEST 2: Player wins on diagonal ====");
//     let game2 = gameController();
//     game2.playRound(0, 0);
//     game2.playRound(0, 1);
//     game2.playRound(1, 1);
//     game2.playRound(0, 2);
//     game2.playRound(2, 2);

//     console.log("\n==== TEST 3: Draw condition ====");
//     let game3 = gameController();
//     game3.playRound(0, 0);
//     game3.playRound(0, 1);
//     game3.playRound(0, 2);
//     game3.playRound(1, 1);
//     game3.playRound(1, 0);
//     game3.playRound(1, 2);
//     game3.playRound(2, 1);
//     game3.playRound(2, 0);
//     game3.playRound(2, 2);

//     console.log("\n==== TEST 4: Invalid move (occupied cell) ====");
//     let game4 = gameController();
//     game4.playRound(0, 0);
//     game4.playRound(0, 0);

//     console.log("\n==== TEST 5: Win on last move ====");
//     let game5 = gameController();
//     game5.playRound(0, 0);
//     game5.playRound(0, 1); 
//     game5.playRound(0, 2); 
//     game5.playRound(1, 1); 
//     game5.playRound(1, 0); 
//     game5.playRound(1, 2);
//     game5.playRound(2, 1); 
//     game5.playRound(2, 0);
//     game5.playRound(2, 2); 
// }

// runTestCases();