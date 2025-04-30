const answer = "squid";

let row = 0;
let col = 0;

const alpha = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];

function makeBox(container, row, col) {
    const box = document.createElement("div");
    box.className = 'box';
    box.id = "box" + row + col;
    box.textContent = '';
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

function enterKey() {
    document.body.onkeydown = (e) => {
        const key = e.key;

        if (key == "Backspace") {
            deleteLetter();
        } else if (alpha.includes(key)){
            addLetter(key);
        }

        document.getElementById("test").textContent = row + "," + col;


    }
}

function addLetter(key) {
    if (col < 5 && row < 6) {
        const curr = document.getElementById("box" + row + col);
        curr.textContent = key;
        test(curr);
        if (col == 4) {
            row++;
            col = 0;
        } else {
            col++;
        }
    }
}
function deleteLetter() {
    if (col > 0) {
        col--;
    }
    else if (col == 0 && row > 0) {
            row--;
            col = 4;
        }
        const curr = document.getElementById("box" + row + col);
        curr.textContent = '';
        test(curr);
    }



    function test(curr) {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.style.backgroundColor = ''; 
        })
        curr.style.backgroundColor = 'black';
    }
    
start();
enterKey();





