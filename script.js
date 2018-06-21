let canvas = document.getElementById("c1");
let ctx = canvas.getContext("2d");
let mas = [];
let selectSize = document.getElementById("select1");
let fieldSize = selectSize.value;
let directions = [0,0,1,0];
let snake = [];
let previousKeyKode = 39;
let possibl = true;
let apple = {};

function setPlayground(someSize){
    canvas.style.width = someSize + "px";
    canvas.style.height = someSize + "px";
    canvas.width = someSize;
    canvas.height = someSize;
}

setPlayground(fieldSize);

function field(someSize){
    for(let i = 0; i < someSize/10; i++) {
        mas[i] = [];
        for (let j = 0; j < someSize/10; j++) {
            if(i == 0 || i == someSize/10-1) {
                mas[i][j] = 9;
            } else if(j == 0 || j == someSize/10-1) {
                mas[i][j] = 9;
            } else {
                mas[i][j] =0;
            }
        }
    }
}

field(fieldSize);

function createSnake (someValue) {
    let center = (someValue/10/2);
    mas[center][center] = 1;
    snake[0] = {
        xCoord: center,
        yCoord: center
    }
}

createSnake(fieldSize);

function randomizeApple (someValue) {
    apple.yAppleCoord = Math.floor(Math.random() * ((someValue/10-1) - 1)) + 1;
    apple.xAppleCoord = Math.floor(Math.random() * ((someValue/10-1) - 1)) + 1;
    mas[apple.yAppleCoord][apple.xAppleCoord] = 3;
}

randomizeApple(fieldSize);

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
    
    document.body.onkeydown = function catchDirecton (event) {
        if(event.keyCode == 37 && previousKeyKode != 39) {
            directions = [1,0,0,0]; previousKeyKode = 37;
        } else if(event.keyCode == 37 && previousKeyKode == 39) {
            directions = [0,0,1,0];
        } // Двигаемся влево если до этого не двигались вправо. Если же двигались то продолжаем двигаться
        if(event.keyCode == 38 && previousKeyKode != 40) {
            directions = [0,1,0,0]; previousKeyKode = 38;
        } else if(event.keyCode == 38 && previousKeyKode == 40) {
            directions = [0,0,0,1];
        }// Двигаемся вверх
        if(event.keyCode == 39 && previousKeyKode != 37) {
            directions = [0,0,1,0]; previousKeyKode = 39;
        } else if(event.keyCode == 39 && previousKeyKode == 37) {
            directions = [1,0,0,0];
        }// Двигаемся вправо
        if(event.keyCode == 40 && previousKeyKode != 38) {
            directions = [0,0,0,1]; previousKeyKode = 40;
        } else if(event.keyCode == 40 && previousKeyKode == 38) {
            directions = [0,1,0,0];
        }// Двигаемся вниз
    };
    moveSnake(fieldSize);
    //граничные условия
    if(snake[0].yCoord == fieldSize/10-1 || snake[0].yCoord == 0 || snake[0].xCoord == fieldSize/10-1 || snake[0].xCoord == 0) {
        createSnake(fieldSize);
        alert("gameover");
        return;
    }
    
    if(snake[0].yCoord == apple.yAppleCoord && snake[0].xCoord == apple.xAppleCoord){
        randomizeApple(fieldSize);
    }
    checkAndDraw(fieldSize);
    setTimeout(startSnake, 200);
};

function checkAndDraw (someValue) {
    ctx.clearRect(0, 0, someValue, someValue);
    for(let i = 0; i < someValue/10; i++) {
        for (let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 0) {
                ctx.beginPath();
                ctx.strokeStyle = "rgb(255, 255, 255)";
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
            } else if(mas[i][j] == 9) {
                ctx.clearRect(j * 10, i * 10, 10, 10);
                ctx.beginPath();
                ctx.fillStyle = "#d8cece";
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
    randomizeApple(fieldSize);
};
