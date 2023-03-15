const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
const gridSize = 10; // Change this value to set a different grid size
const colorCount = 2; // Change this value to use a different number of colors

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

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

    for (let y = 0; y < gridSize; y++) {
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
                } else if (tile.classList.contains('start-tile') || tile.classList.contains('end-tile')) {
                    return;
                } else {
                    setSelected(tile);
                }
            });

            gameBoard.appendChild(tile);
        }
    }
}

resetButton.addEventListener('click', () => {
    generateGameBoard();
});

generateGameBoard();

 