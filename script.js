//Logic 
    //When game is over
    //All winning 3 in-a-row and ties
        

//Gameboard Object
let gameboard = (function() {
   let rows = 3;
   let columns = 3;
   let board = [];

   for (let i = 0; i < rows; i++) {
    //creation of each row
    board[i] = []
    for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
    }

   }

   const getBoard = () => board;

 //Where the player places their token ("X" or "O")
   const placeToken = (row, column, player) => {
   
    //We know where the player wants to mark their spot via row and column params.
    //This means we can search the matrix to the spot the player wants to mark
    
    if (board[row][column].getValue() === "X" || board[row][column].getValue()) {
       return console.log("Spot taken")
    }
    board[row][column].addToken(player);
   }

   const printBoard = () => {
    const printedBoard = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(printedBoard);
    return printedBoard;
   }
   

   return { getBoard, placeToken, printBoard };

})();

//Game controller
let gameController = (function() {

    let playerOne = createPlayer("Player One");
    let playerTwo = createPlayer("Player Two");

    const players = [
       {
        name: playerOne.playerName,
        token: "X"
       },
       {
        name: playerTwo.playerName,
        token: "O"
       }
    ];

    let currentPlayer = players[0];

    const getCurrentPlayer = () => currentPlayer

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn`)
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer = players[0] ? players[1] : players[0];
    }

    const playRound = (row, column) => {
        console.log(`${getCurrentPlayer().name}'s marked their spot!`)
        // gameboard.placeToken(row, column, getCurrentPlayer().token);

        determineWinner();
        switchPlayer();
        printNewRound();
    };

    printNewRound();
    

    const determineWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8],
        ]

        let flatBoard = gameboard.printBoard().flat();
        console.log(flatBoard);

        const checkForWin = (marker) => {
            return winConditions.find((condition) => condition.every((index) => flatBoard[index] === marker));
        }

        if (checkForWin("O")) {
            return console.log("WINNER")
        }

        console.log(checkForWin("O"));
    }

   

    return {
        playRound,
        getCurrentPlayer
    }

    //render
    //reset game
    //winner
})();

function Cell() {
    let value = 0;

    const getValue = () => value;

    const addToken = (player) => {
        value = player
    }

    return { getValue, addToken }
}

//Factory function to create players
function createPlayer(name) {

    const playerName = name;


    return { playerName }
}


