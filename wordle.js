const numAnswer =  Math.floor(Math.random()*100000);


let row = 0;
let col = 0;
let gameOver = false;

// FIX BUG WITH NON FULL NUMBERS
const alpha = [
    '0', '1', '2', '3', '4', '5', 
    '6', '7', '8', '9'
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
            hoveredGrid(curr);
        }
        document.getElementById("test").textContent = row + "," + col;

    }
}

function addLetter(key) {
    if (col < 5 && row < 6) {
        const curr = document.getElementById("box" + row + col);
        curr.textContent = key;
        hoveredGrid(curr);
        col++;
    }
}
function deleteLetter() {
    if (col > 0) {
        col--;
    }
    const curr = document.getElementById("box" + row + col);
    curr.textContent = '';
    hoveredGrid(curr);
}



function hoveredGrid(curr) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.style.backgroundColor = '';
    })
    curr.style.backgroundColor = 'black';
}

function update() {
const word = document.getElementById("currWord");
   let answer = fetchWord();
    if (answer == numAnswer) {
        showWinLose("winner");
    }
    else if (answer != numAnswer && row == 5) {
        showWinLose("loser");
    } else {
        reveal();
        alert(numAnswer);
    }
}

function reveal() {
    let copy = numAnswer.toString().split('');
    for (let i = 0; i < 5; i++) {
        const currBox = document.getElementById("box" + row + i);
        const currLetter = currBox.textContent;
        if (currLetter == copy[i]) {
            currBox.classList.add("right");
            copy[i] = "a";
        } 
    }
    for (let i = 0; i < 5; i++) {
        const currBox = document.getElementById("box" + row + i);
        const currLetter = currBox.textContent;
        if (copy.includes(currLetter)) {
            if (!currBox.classList.contains("right")) {
                currBox.classList.add("partial");
                copy[copy.indexOf(currLetter)] = "a";
            }
            
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

function reset() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.remove('right', 'partial');
        box.style.backgroundColor = '';
        box.textContent = '';
        row = -1;
        col = 0;
    })
}

function show() {
    const show = document.getElementById("answer");
    show.textContent = numAnswer.toString();
}

function showWinLose(id) {
    const winDiv = document.getElementById(id);
    winDiv.style.display = "block";
}
function closeWinLose(id) {
    const winDiv = document.getElementById(id);
    winDiv.style.display = "none";
}





show();
start();
enterKey();





