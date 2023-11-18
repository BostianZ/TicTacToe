//Gameboard Object
let gameboard = (function() {
   let rows = 3;
   let columns = 3;
   let board = [];
  

//    for (let i = 0; i < rows; i++) {
//     //creation of each row
//     board[i] = []
//     for (let j = 0; j < columns; j++) {
//         board[i].push(Cell());
//     }
//    }

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
    return printedBoard;
   }

   const createBoard = () => {
    for (let i = 0; i < rows; i++) {
        //creation of each row
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
   }
   
   const resetBoard = () => {
        createBoard();
        const startBtn = document.querySelector(".btn-start");
        startBtn.hidden = false;
   }


   return { getBoard, placeMarker, printBoard, resetBoard, createBoard };


})();

//Game Controller
const gameController = (function() {
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
        if (currentPlayer === players[0]) {
            currentPlayer = players[1]
        } else if (currentPlayer === players[1]) {
            currentPlayer = players[0]
        }
    }

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
        const mark = getCurrentPlayer().playerMarker;
        gameboard.placeMarker(row, column, mark);

        if (checkForWin(mark)) {
            return;
        }

        switchPlayer();
        // printNewRound();
    };

    const startBtnToggle = () => {
        const startBtn = document.querySelector(".btn-start");
        startBtn.hidden = true;
    }

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

        form.reset();
        screenCtrl.updateScreen();
        startBtnToggle();

    }

    const restartGame  = () => {
        const screenCtrl = Screencontroller();
        gameboard.resetBoard();
    }


    form.addEventListener("submit", start)
    restartBtn.addEventListener("click", restartGame);

    // printNewRound();

    return {
        playRound,
        getCurrentPlayer,
        checkForWin,
        players
    }
})();

function Cell() {
    let value = "";

    const getValue = () => value;

    const addMarker = (mark) => {
        value = mark
    }

    return { getValue, addMarker }
}


function Screencontroller() {
    const boardDiv = document.querySelector(".board");
    const currentPlayerDiv = document.querySelector(".current-player");
    gameboard.createBoard();

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = gameboard.getBoard();
        const currentPlayer = gameController.getCurrentPlayer();

        if (currentPlayer === undefined) {
            currentPlayerDiv.textContent = "Enter your player names!"
        
        } else if (currentPlayer && gameController.checkForWin(currentPlayer.playerMarker)) {
             currentPlayerDiv.textContent = `${currentPlayer.playerName} WINS!`;
        } else {
            currentPlayerDiv.textContent = `${currentPlayer.playerName}'s turn!`;
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

                cellDiv.addEventListener("click", boardClickHandler)

                rowDiv.appendChild(cellDiv);
            })
        })
    }

   
    const boardClickHandler = (e) => {
        const column = e.target.dataset.column;
        const row = e.target.parentNode.dataset.row;
        gameController.playRound(row, column);
        updateScreen();
    }

    // boardDiv.addEventListener("click", boardClickHandler)

    updateScreen();

    return { updateScreen }

}


Screencontroller();