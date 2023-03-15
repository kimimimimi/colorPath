const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
const gridSize = 5; // Change this value to set a different grid size
const colorCount = 2; // Change this value to use a different number of colors

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`;
gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 30px)`;

function createTile(color, x, y) {
  const tile = document.createElement('div');
  tile.classList.add('tile', color);
  tile.dataset.x = x;
  tile.dataset.y = y;
  return tile;
}

function setSelected(tile) {
  tile.classList.add('selected');
}

function isTileSelected(tile) {
  return tile.classList.contains('selected');
}

function clearSelected() {
  const selectedTiles = gameBoard.getElementsByClassName('selected');
  while (selectedTiles[0]) {
    selectedTiles[0].classList.remove('selected');
  }
}

function isGoalReached(startTile, endTile) {
  const startX = parseInt(startTile.dataset.x);
  const startY = parseInt(startTile.dataset.y);
  const endX = parseInt(endTile.dataset.x);
  const endY = parseInt(endTile.dataset.y);

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  const visited = new Set();
  const queue = [[startX, startY]];

  while (queue.length) {
    const [x, y] = queue.shift();
    const key = `${x},${y}`;

    if (x === endX && y === endY) {
      return true;
    }

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize) {
        continue;
      }

      const nextTile = gameBoard.childNodes[ny * gridSize + nx];
      if (
        !visited.has(`${nx},${ny}`) &&
        nextTile.classList.contains(startTile.classList[1]) &&
        nextTile.classList.contains('selected')
      ) {
        queue.push([nx, ny]);
      }
    }
  }

  return false;
}

function generateGameBoard() {
  gameBoard.innerHTML = '';

  const startPosition = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };

  const endPosition = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };

  for (let y = 0; y < gridSize; y++)
  {
        for (let x = 0; x < gridSize; x++) {
            const color = colors[Math.floor(Math.random() * colorCount)];

            const tile = createTile(color, x, y);

            if (x === startPosition.x && y === startPosition.y) {
                tile.classList.add('start-tile');
                tile.innerText = 'S';
                setSelected(tile);
            } else if (x === endPosition.x && y === endPosition.y) {
                tile.classList.add('end-tile');
                tile.innerText = 'E';
            }

            tile.addEventListener('click', () => {
                if (isTileSelected(tile)) {
                    clearSelected();
                } else if (tile.classList.contains('start-tile')) {
                    return;
                } else {
                    setSelected(tile);
                    const startTile = gameBoard.getElementsByClassName('start-tile')[0];
                    const endTile = gameBoard.getElementsByClassName('end-tile')[0];

                    if (isGoalReached(startTile, endTile)) {
                        setTimeout(() => {
                            alert('Congratulations! You have connected the path!');
                        }, 100);
                    }
                }
            });

            gameBoard.appendChild(tile);
        }
    }
}

generateGameBoard();

resetButton.addEventListener('click', () => {
    clearSelected();
    generateGameBoard();
});
