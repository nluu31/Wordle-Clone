let numAnswer = Math.floor(Math.random() * 100000);
while (numAnswer < 10000) {
    numAnswer = numAnswer * 10;
};

let row = 0;
let col = 0;
let gameOver = false;
let winStreak = 0;

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

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            makeBox(grid, x, y);
        }
    }
    container.appendChild(grid);
}

function start() {
    const game = document.getElementById("game");
    makeGrid(game);

    const mobileInput = document.getElementById("mobileInput");
    mobileInput.focus();

    mobileInput.addEventListener("input", () => {
        const value = mobileInput.value;

        if (value.length > col && col < 5) {
            const key = value[value.length - 1];
            if (alpha.includes(key)) {
                addLetter(key);
            }
        } else if (value.length < col) {
            deleteLetter();
        }

        if (value.length === 5 && !gameOver) {
            reveal();
            update();
            row++;
            col = 0;
            mobileInput.value = "";
            if (row < 5) {
                const curr = document.getElementById("box" + row + col);
                hoveredGrid(curr);
            }
        }
    });
}

function enterKey() {

    document.body.onkeydown = (e) => {
        if (gameOver) {
            return;
        }
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
    if (col < 5 && row < 5) {
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
        gameOver = true;
        winStreak++;
        updateStreak();
    }
    else if (answer != numAnswer && row == 4) {
        showWinLose("loser");
        revealNumber();
        gameOver = true;
        winStreak = 0;
        updateStreak();
    } else {
        reveal();
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

function showWinLose(id) {
    const winDiv = document.getElementById(id);
    winDiv.style.display = "block";
    
}
function closeWinLose(id) {
    const winDiv = document.getElementById(id);
    winDiv.style.display = "none";
}

function revealNumber() {
    const winDiv = document.getElementById("loseText");
    winDiv.innerText = "The Number was " + numAnswer;
}

function resetGame() {
    reset();
    col = 0;
    row = 0;
    gameOver = false;
    numAnswer = Math.floor(Math.random() * 100000);
    while (numAnswer < 10000) {
        numAnswer = numAnswer * 10;
    };
    closeWinLose("winner");
    closeWinLose("loser");
}

function updateStreak() {
    const score = document.getElementById("winstreak");
    score.textContent = winStreak;
}







start();
enterKey();





