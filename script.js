const statusDisplay = document.querySelector('.gameStatus');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const currentPlayerTurn  = () => `It's ${currentPlayer}'s turn`;
const winningMessage = () => `Player ${currentPlayer} has won!`;
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function marksCell(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function playerChange() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}
function checkResults() {
    let roundWon = false;
    for (let i = 0; i <= 7; ++i) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = "Game ended, is equality!";
        gameActive = false;
        return;
    }
    playerChange();
}
function checkCell(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    marksCell(clickedCell, clickedCellIndex);
    checkResults();
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', checkCell));
