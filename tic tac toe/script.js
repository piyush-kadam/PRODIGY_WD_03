document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let gameBoard = Array.from({ length: 9 }, () => '');
    let gameActive = true;

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
    }

    // Function to handle player's move
    function makeMove(index) {
        if (gameActive && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            renderBoard();

            if (checkWin(currentPlayer)) {
                announceWinner(currentPlayer);
            } else if (!gameBoard.includes('')) {
                announceTie();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if (currentPlayer === 'O') {
                    setTimeout(makeComputerMove, 500);
                }
            }
        }
    }

    // Function to handle computer's move (random move)
    function makeComputerMove() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
            if (value === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            makeMove(emptyCells[randomIndex]);
        }
    }

    // Function to render the updated board
    function renderBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    // Function to check for a win
    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => pattern.every(index => gameBoard[index] === player));
    }

    // Function to announce the winner
    function announceWinner(winner) {
        message.textContent = `${winner} wins!`;
        gameActive = false;
        restartBtn.style.display = 'block';
    }

    // Function to announce a tie
    function announceTie() {
        message.textContent = 'It\'s a tie!';
        gameActive = false;
        restartBtn.style.display = 'block';
    }

    // Function to restart the game
    window.restartGame = function () {
        gameBoard = Array.from({ length: 9 }, () => '');
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = '';
        restartBtn.style.display = 'none';
        renderBoard();
        if (currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500);
        }
    };
});
