const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
      message.textContent = `${currentPlayer} wins!`;
      message.style.color = '#61dafb';
      gameActive = false;
    } else if (isBoardFull()) {
      message.textContent = "It's a draw!";
      message.style.color = '#61dafb';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `It's player ${currentPlayer}'s turn`;
      message.style.color = '#61dafb';
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],             // Diagonals
    [0, 1, 2, 3, 4, 5, 6, 7, 8]       // All cells
  ];

  for (const combination of winningCombinations) {
    const cellsInCombination = combination.map(index => gameBoard[index]);
    const isWinningCombination = cellsInCombination.every(cell => cell === currentPlayer);

    if (isWinningCombination) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  message.textContent = "It's player X's turn";
  message.style.color = '#61dafb';
}
