const wordAnswer = "quidd";

let row = 0;
let col = 0;
let gameOver = false;


const alpha = [
    '0', '1', 
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
        } else if (alpha.includes(key) && col != 5) {
            addLetter(key);
        }
        if (key == "Enter" && col == 5) {
            reveal();
            update();
            row++;
            col = 0;

            const curr = document.getElementById("box" + row + col);
            test(curr);
        }
        document.getElementById("test").textContent = row + "," + col;

    }
}

function addLetter(key) {
    if (col < 5 && row < 6) {
        const curr = document.getElementById("box" + row + col);
        curr.textContent = key;
        test(curr);
        col++;
    }
}
function deleteLetter() {
    if (col > 0) {
        col--;
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

function update() {
const word = document.getElementById("currWord");
   let answer = fetchWord();
    if (answer == wordAnswer) {
        word.textContent = "WINNER!!!";
        // DO SOMETHING THAT STOPS THE GAME
    }
    else if (answer != wordAnswer && row == 5) {
        word.textContent = "GAME OVER, U SUCK";
        // DO SOMETHING THAT ENDS THE GAME
    } else {
        reveal();
        alert(wordAnswer);
    }
}

function reveal() {
    let copy = wordAnswer.split('');
    for (let i = 0; i < 5; i++) {
        const currBox = document.getElementById("box" + row + i);
        const currLetter = currBox.textContent;
        if (currLetter == copy[i]) {
            currBox.classList.add("right");
            copy[i] = "0";
        } else if (copy.includes(currLetter)) {
            currBox.classList.add("partial");
            copy[copy.indexOf(currLetter)] = "0";
        }
    }

}

function fetchWord() {
    let string = "";
    for (let x = 0; x < 5; x++) {
        const letter = document.getElementById("box" + row + x).textContent;
        string += letter;
    }
    return string;
}

start();
enterKey();





