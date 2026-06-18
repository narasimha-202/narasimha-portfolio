const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const modeSelect = document.getElementsByName("mode");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp"; // default

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const button = document.createElement("button");
    button.classList.add("cell");
    button.textContent = cell ? cell : "";
    button.addEventListener("click", () => handleClick(index));
    board.appendChild(button);
  });
}

function handleClick(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (cells.every((cell) => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;

  // If vs Computer and it's O's turn
  if (mode === "cpu" && currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const available = cells
    .map((c, i) => (c ? null : i))
    .filter((i) => i !== null);
  const move = available[Math.floor(Math.random() * available.length)];
  cells[move] = "O";
  renderBoard();
  if (checkWinner()) {
    status.textContent = "💻 Computer wins!";
    gameActive = false;
    return;
  } else if (cells.every((cell) => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winPatterns.some(
    ([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
  );
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

modeSelect.forEach((radio) => {
  radio.addEventListener("change", () => {
    mode = document.querySelector('input[name="mode"]:checked').value;
    resetGame();
  });
});

resetBtn.addEventListener("click", resetGame);
renderBoard();
