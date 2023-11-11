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
    //Loop through the board and determine if the cell contains an X or O
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = board[i][j]
            if (board[i][j].getValue() === "X" || board[i][j].getValue() === "O") {
                return console.log("This spot is taken, choose a different spot.")
            }  else {
                board[row][column].addToken(player);
                return;
            }
        }
    }
    //Spot must be available, add players token.
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
        let board = gameboard.printBoard();

        // console.log(board);
        
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


