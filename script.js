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

   const placeToken = (column, row, player) => {
    //Determines where current player places their token

   }

   const printBoard = () => {
    const printedBoard = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(printedBoard);
   }

   return { getBoard, placeToken, printBoard };

})();

function Cell() {
    let value = " "

    const getValue = () => value;

    const addToken = (player) => {
        value = player
    }

    return { getValue, addToken }
}

//Game controller
let gameController = (function() {

    const players = [
       {
        name: "Player One",
        token: "X"
       },
       {
        name: "Player Two",
        token: "O"
       }
    ];


    //render
    //reset game
    //winner

})();

//Factory function to create players
function createPlayer(name) {
    const playerName = name;


    return { playerName }
}

let playerOne = createPlayer("zack")
let playerTwo = createPlayer("test")
console.log(playerOne.playerName, playerTwo.playerName)



console.log(gameboard);