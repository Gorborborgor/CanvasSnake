let canvas = document.getElementById("c1");
let ctx = canvas.getContext("2d");
let mas = [];
let selectSize = document.getElementById("select1");
let fieldSize = selectSize.value;
let directions = [0,1,0,0];

function setPlayground(someSize){
    canvas.style.width = someSize + "px";
    canvas.style.height = someSize + "px";
    canvas.width = someSize;
    canvas.height = someSize;
}

setPlayground(fieldSize);

function field(someSize){
    let ourSize = someSize;
    let axisX = ourSize/10;
    let axisY = ourSize/10;
    for(let i = 0; i < axisY; i++) {
        mas[i] = [];
        for (let j = 0; j < axisX; j++) {
            mas[i][j] = 0;
        }
    }
    console.log(axisX);
}

field(fieldSize);

function createSnake (someValue) {
    let snakeLength = 5;
    let counter = 0;
    let center = (someValue/10/2);
    for(let i = center; i < center+1; i++) {
        for(let j = center; j < center+snakeLength; j++) {
            counter++;
            console.log(counter);
            if(counter == 1) mas[i][j] = 3; // tail of the snake
            if(counter == 2 || counter == 3 || counter == 4) mas[i][j] = 2; //body of the snake
            if(counter == 5) mas[i][j] = 1; //head of the snake
        }
    }
    console.log(mas);
}

createSnake(fieldSize);

// функция отлавливает нажатие на стрелочные клавиши и задает направление
//document.body.onkeydown = function catchDirecton (event) {
//    let directions = [];
//    if(event.keyCode == 37) {directions = [1,0,0,0]};// Двигаемся влево
//    if(event.keyCode == 38) {directions = [0,1,0,0]};// Двигаемся вверх
//    if(event.keyCode == 39) {directions = [0,0,1,0]};// Двигаемся вправо
//    if(event.keyCode == 40) {directions = [0,0,0,1]};// Двигаемся вниз
//    console.log(directions);
//};

function drawRight(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 1){
                mas[i][j+1] = 1;
                mas[i][j] = 2;
                return;
            }
        }
    }
}

function drawLeft(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 1){
                mas[i][j-1] = 1;
                mas[i][j] = 2;
                return;
            }
        }
    }
}

function drawUp(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 1){
                mas[i-1][j] = 1;
                mas[i][j] = 2;
                return;
            }
        }
    }
}

function drawDown(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 1){
                mas[i+1][j] = 1;
                mas[i][j] = 2;
                return;
            }
        }
    }
}

function eraseRight(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 3){
                mas[i][j] = 0;
                mas[i][j+1] = 3;
                return;
            }
        }
    }
}

function eraseUp(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 3){
                mas[i][j] = 0;
                mas[i-1][j] = 3;
                return;
            }
        }
    }
}

function eraseLeft(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 3){
                mas[i][j] = 0;
                mas[i][j-1] = 3;
                return;
            }
        }
    }
}

function eraseDown(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 3){
                mas[i][j] = 0;
                mas[i+1][j] = 3;
                return;
            }
        }
    }
}

document.getElementById("start").onclick = function startSnake() {
    console.log("its a start");
    if(directions[0] == 1){
        drawLeft(fieldSize);
        eraseLeft(fieldSize);
    } else if (directions[1] == 1) {
        drawUp(fieldSize);
        eraseUp(fieldSize);
    } else if (directions[2] == 1) {
        drawRight(fieldSize);
        eraseRight(fieldSize);
    } else {
        drawDown(fieldSize);
        eraseDown(fieldSize);
    }
    setTimeout(startSnake, 1000);
    checkAndDraw(fieldSize);
};

function checkAndDraw (someValue) {
    ctx.clearRect(0, 0, someValue, someValue);
    for(let i = 0; i < someValue/10; i++) {
        for (let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 0) {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.rect(j * 10, i * 10, 10, 10);
                ctx.closePath();
                ctx.stroke();
            } else if(mas[i][j] == 1) {
                ctx.clearRect(j * 10, i * 10, 10, 10);
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.fillRect(j * 10, i * 10, 10, 10);
                ctx.closePath();
                ctx.stroke();
            } else if(mas[i][j] == 2) {
                ctx.clearRect(j * 10, i * 10, 10, 10);
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(j * 10, i * 10, 10, 10);
                ctx.closePath();
                ctx.stroke();
            } else if(mas[i][j] == 3) {
                ctx.clearRect(j * 10, i * 10, 10, 10);
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.fillRect(j * 10, i * 10, 10, 10);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}

checkAndDraw(fieldSize);

selectSize.onchange = function() {
    fieldSize = selectSize.value;
    setPlayground(fieldSize);
    field(fieldSize);
    createSnake(fieldSize);
    checkAndDraw(fieldSize);
};

