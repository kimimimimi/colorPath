const colors = ['red', 'yellow', 'blue'];
const gridSize = 10;

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

function createTile(color) {
    const tile = document.createElement('div');
    tile.classList.add('tile', color);
    return tile;
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
            const color = colors[Math.floor(Math.random() * colors.length)];

            const tile = createTile(color);

            if (x === startPosition.x && y === startPosition.y) {
                tile.classList.add('start-tile');
                tile.innerText = 'S';
            } else if (x === endPosition.x && y === endPosition.y) {
                tile.classList.add('end-tile');
                tile.innerText = 'E';
            }

            gameBoard.appendChild(tile);
        }
    }
}

resetButton.addEventListener('click', () => {
    generateGameBoard();
});

generateGameBoard();
