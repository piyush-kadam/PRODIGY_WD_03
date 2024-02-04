// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

// Event listeners
boardElement.addEventListener('click', handleCellClick);

// Initialize the game board
initializeBoard();

// Function to initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        boardElement.appendChild(cell);
    }
}

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    // Check if the cell is empty and the game is active
    if (gameBoard[index] === '' && gameActive) {
        // Update the game board and UI
        gameBoard[index] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // Check for a win or a draw
        if (checkForWin() || checkForDraw()) {
            endGame();
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a win
function checkForWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            messageElement.textContent = `${currentPlayer} wins!`;
            return true;
        }
    }

    return false;
}

// Function to check for a draw
function checkForDraw() {
    if (!gameBoard.includes('')) {
        messageElement.textContent = "It's a draw!";
        return true;
    }
    return false;
}

// Function to end the game
function endGame() {
    gameActive = false;
    boardElement.removeEventListener('click', handleCellClick);
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageElement.textContent = '';
    boardElement.innerHTML = '';
    initializeBoard();
    boardElement.addEventListener('click', handleCellClick);
}
