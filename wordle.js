function makeBox(container, row, col) {
    const box = document.createElement("div");
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = 'A';
    container.appendChild(box);
    return box;
    
}

function makeGrid(container) {
    const grid = document.createElement("div");
    grid.className = "grid";

    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 5; y++) {
            makeBox(grid, x, y);
        }
    }
    container.appendChild(grid);
}

function start() {
    const game = document.getElementById("game");
    makeGrid(game);
}
start();




