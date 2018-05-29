let canvas = document.getElementById("c1");
let ctx = canvas.getContext("2d");
let mas = [];
let selectSize = document.getElementById("select1");
let fieldSize = selectSize.value;
let directions = [0,0,1,0];
let snake = [];
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
    let center = (someValue/10/2);
    mas[center][center] = 1;
    snake[0] = {
        id: 0,
        xCoord: center,
        yCoord: center
    }
}

createSnake(fieldSize);

function drawRight(someValue) {
    for(let i = 0; i < someValue/10; i++) {
        for(let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 1){
                mas[i][j+1] = 1;
                mas[i][j] = 0;
                snake[0].xCoord = j+1;
                snake[0].yCoord = i;
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
                mas[i][j] = 0;
                snake[0].xCoord = j-1;
                snake[0].yCoord = i;
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
                mas[i][j] = 0;
                snake[0].xCoord = j;
                snake[0].yCoord = i-1;
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
                mas[i][j] = 0;
                snake[0].xCoord = j;
                snake[0].yCoord = i+1;
                return;
            }
        }
    }
}

function moveSnake (someValue) {
    if (directions[0] == 1) {
        drawLeft(someValue);
    } else if (directions[1] == 1) {
        drawUp(someValue);
    } else if (directions[2] == 1) {
        drawRight(someValue);
    }    if (directions[3] == 1) {
        drawDown(someValue);
    }
}

document.getElementById("start").onclick = function startSnake() {
    if (directions[0] == undefined) {
        directions = [0, 0, 1, 0];
        return;
    }
    console.log("one more turn");
    console.log(snake[0].xCoord);
    console.log(snake[0].yCoord);
    document.body.onkeydown = function catchDirecton (event) {
        if(event.keyCode == 37) {directions = [1,0,0,0]};// Двигаемся влево
        if(event.keyCode == 38) {directions = [0,1,0,0]};// Двигаемся вверх
        if(event.keyCode == 39) {directions = [0,0,1,0]};// Двигаемся вправо
        if(event.keyCode == 40) {directions = [0,0,0,1]};// Двигаемся вниз
    };
    moveSnake(fieldSize);
    if (snake[0].xCoord == fieldSize/10 || snake[0].xCoord == -1 || snake[0].yCoord == (fieldSize/10)-1 || snake[0].yCoord == 0) {
        mas[fieldSize/10/2][fieldSize/10/2] = 1;
        checkAndDraw(fieldSize);
        alert("you died");
        return;
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
    directions = [];
};
