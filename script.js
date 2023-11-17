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
   const placeMarker = (row, column, player) => {
    //We know where the player wants to mark their spot via row and column params.
    //This means we can search the matrix to the spot the player wants to mark
    if (board[row][column].getValue() === "X" || board[row][column].getValue() === "O") {
       return console.log("Spot taken")
    }
    board[row][column].addMarker(player);
   }

   const printBoard = () => {
    const printedBoard = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(printedBoard);
    return printedBoard;
   }
   
   const restartBoard = () => {
        //Board contains cell objects with getValue and addMarker methods
        //We need to change the values within the board and then those values ought
        //to change within the screencontroller
        let board = gameboard.getBoard();
        let newBoard = board.forEach((cell, index) => {
            cell[index] = Cell();
        })

        console.log(newBoard);
        return newBoard;
    
    }


   return { getBoard, placeMarker, printBoard, restartBoard };


})();

//Game Controller
function Gamecontroller() {
    const form = document.querySelector("form");
    const restartBtn = document.querySelector(".btn-restart");
    let players = [];
    let currentPlayer; 


    const createPlayer = (name, marker) => {
        let playerName =  name;
        let playerMarker = marker
        return { playerName, playerMarker }
    }

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        // currentPlayer = currentPlayer = players[0] ? players[1] : players[0];
        if (currentPlayer === players[0]) {
            currentPlayer = players[1]
        } else if (currentPlayer === players[1]) {
            currentPlayer = players[0]
        }
    }
    
    // const printNewRound = () => {
    //     gameboard.printBoard();
    //     // console.log(`${getCurrentPlayer().name}'s turn`)
    // }

    const checkForWin = (marker) => {
        const winDiv = document.querySelector(".winner");

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

        return win = winConditions.find((condition) => condition.every((index) => flatBoard[index] === marker));

    }

    const playRound = (row, column) => {
        console.log(currentPlayer);
        const mark = getCurrentPlayer().playerMarker;
        gameboard.placeMarker(row, column, mark);

        checkForWin(mark);
        switchPlayer();
        // printNewRound();
    };

    const start = (e) => {
        e.preventDefault();
        const screenCtrl = Screencontroller();

        if (players.length >= 2) {
            return console.log("Already players playing")
        } 
        const playerOne = createPlayer(document.querySelector(".player-one").value, "X");
        const playerTwo = createPlayer(document.querySelector(".player-two").value, "O");
        players.push(playerOne, playerTwo);
        currentPlayer = players[0];
        console.log(players)
        form.reset();
        // screenCtrl.updateCurrentPlayer();

    }

    form.addEventListener("submit", start)
    restartBtn.addEventListener("click", gameboard.restartBoard);

    // printNewRound();

    return {
        playRound,
        getCurrentPlayer,
        checkForWin,
        players
    }
}

function Cell() {
    let value = "";

    const getValue = () => value;

    const addMarker = (player) => {
        value = player
    }

    return { getValue, addMarker }
}


function Screencontroller() {

    const game = Gamecontroller();
    const boardDiv = document.querySelector(".board");
    const currentPlayerDiv = document.querySelector(".current-player");

    const updateScreen = () => {

        boardDiv.textContent = "";
        const board = gameboard.getBoard();

        if (game.players.length === 0) {
            currentPlayerDiv.textContent = "Please choose your names!";
            } else {
         
                if (game.checkForWin(game.getCurrentPlayer().playerMarker)) {
                    currentPlayerDiv.textContent = `${game.getCurrentPlayer().playerName}'s WINS!`
                } else {
                   currentPlayerDiv.textContent = `${game.getCurrentPlayer().playerName}'s turn!`
          }
        }

        board.forEach((row, index)=> {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("board-row");
            rowDiv.dataset.row = index
            boardDiv.appendChild(rowDiv)
            row.forEach((cell, index) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add('cell');
                cellDiv.dataset.column = index;
                cellDiv.textContent = cell.getValue();

                rowDiv.appendChild(cellDiv);
            })
        })
    }

   
    const boardClickHandler = (e) => {
        const column = e.target.dataset.column;
        const row = e.target.parentNode.dataset.row;
  
        game.playRound(row, column);
        updateScreen();
    }

    boardDiv.addEventListener("click", boardClickHandler)

    updateScreen();

}


Screencontroller();