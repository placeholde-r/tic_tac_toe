const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const overlay = document.getElementById('overlay');
const winnerText = document.getElementById('winnerText');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handleResultValidation() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        highlightWinningCells(winningLine);
        showWinner(`Player ${currentPlayer} Wins!`);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.innerHTML = `Game ended in a draw!`;
        gameActive = false;
        showWinner("It's a Draw!");
        return;
    }

    handlePlayerChange();
}

function highlightWinningCells(winningLine) {
    winningLine.forEach(index => {
        cells[index].classList.add('winning');
    });
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = `Player ${currentPlayer}'s Turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o', 'winning');
    });
    overlay.classList.remove('active');
}

function showWinner(message) {
    setTimeout(() => {
        winnerText.innerText = message;
        overlay.classList.add('active');
    }, 500); // Small delay for visual effect
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', restartGame);
