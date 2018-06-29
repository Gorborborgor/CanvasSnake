// ДОБАВИТЬ ВЫБОР СЛОЖНОСТИ-----------------------DONE
// РЕКУРСНУТЬ РАНДОМАЙЗЕР-------------------------DONE
// ДОБАВИТЬ НЕПРОНИЦАЕМОСТЬ ХВОСТА----------------DONE
// РАЗУКРАСИТЬ И ПРИУКРАСИТЬ----------------------DONE
// ДОБАВИТЬ ОКНО ПРОИГРЫША------------------------DONE
// ДОБАВИТЬ СБОР СТАТИСТИКИ
// ПОПРАВИТЬ БАГ С ПРЕРЫВАНИЕМ--------------------DONE

let canvas = document.querySelector(".canvas"),
    ctx = canvas.getContext("2d"),
    mas = [],
    selectSize = document.querySelector(".size-select"),
    fieldSize = selectSize.value,
    directions = [0,0,1,0],
    snake = [],
    previousKeyKode = 39,
    possibl = true,
    apple = {},
    speed = document.querySelector(".speed"),
    speedValue = 150,
    speedInfo = document.querySelector(".speed-info");

speed.onmousedown = () => {
    speedInfo.style.display = "block";
}
speed.onmouseover = () => {
    speedInfo.style.display = "block";
}
speed.onmouseup = () => {
    speedInfo.style.display = "none";
}
speed.onmouseout = () => {
    speedInfo.style.display = "none";
}

function setSpeed() {
    speed.oninput = function() {
        if(speed.value == 1) {
            speedValue =20;
            speedInfo.innerHTML = "UltraMegaHard";
            speedInfo.style.left = -15.5 + "%";
        } else if(speed.value == 2) {
            speedValue = 50;
            speedInfo.innerHTML = "Hard";
            speedInfo.style.left = 7 + "%";
        } else if(speed.value == 3) {
            speedValue = 150;
            speedInfo.innerHTML = "Normal";
            speedInfo.style.left = 29.5 + "%";
        } else if(speed.value == 4) {
            speedValue = 250;
            speedInfo.innerHTML = "Easy";
            speedInfo.style.left = 52 + "%";
        } else if(speed.value == 5) {
            speedValue = 500;
            speedInfo.innerHTML = "SuperDuperEasy";
            speedInfo.style.left = 74 + "%";
        }
    }
}

setSpeed();


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

class SnakeBlock {
    constructor(yCoord, xCoord) {
        this.yCoord = yCoord;
        this.xCoord = xCoord;
        this.yPrevCoord = this.yCoord;
        this.xPrevCoord = this.xCoord;
    }
    moveRight() {
        this.xPrevCoord = this.xCoord;
        this.yPrevCoord = this.yCoord;
        this.xCoord += 1;
    }
    moveLeft() {
        this.xPrevCoord = this.xCoord;
        this.yPrevCoord = this.yCoord;
        this.xCoord -= 1;
    }
    moveUp() {
        this.xPrevCoord = this.xCoord;
        this.yPrevCoord = this.yCoord;
        this.yCoord -= 1;
    }
    moveDown() {
        this.xPrevCoord = this.xCoord;
        this.yPrevCoord = this.yCoord;
        this.yCoord += 1;
    }
    draw() {
        mas[this.yCoord][this.xCoord] = 1;
    }
    wipeOut() {
        mas[this.yPrevCoord][this.xPrevCoord] = 0;
    }
}

function createSnake (someValue) {
    let center = (someValue/10/2)-1;
    snake = [];
    snake[0] = new SnakeBlock(center, center);
    mas[snake[0].yCoord][snake[0].xCoord] = 1;
}

createSnake(fieldSize);

function addSnakeBlock(y,x) {
    snake[snake.length] = new SnakeBlock(y,x);
}

function moveSnake (someValue) {
    if (directions[0] == 1) {
        snake[0].moveLeft();
    } else if (directions[1] == 1) {
        snake[0].moveUp();
    } else if (directions[2] == 1) {
        snake[0].moveRight();
    } else if (directions[3] == 1) {
        snake[0].moveDown();
    }
    
    if(snake.length > 1) {
        for(let i = 1; i < snake.length; i++){
            snake[i].xPrevCoord = snake[i].xCoord;
            snake[i].yPrevCoord = snake[i].yCoord;
            snake[i].xCoord = snake[i-1].xPrevCoord;
            snake[i].yCoord = snake[i-1].yPrevCoord;
        }
    }
    snake.forEach(block => {block.wipeOut();})
    snake.forEach(block => {block.draw();})
}

moveSnake();

function randomizeApple(someValue) {
    apple.yAppleCoord = Math.floor(Math.random() * ((someValue/10-1) - 1)) + 1;
    apple.xAppleCoord = Math.floor(Math.random() * ((someValue/10-1) - 1)) + 1;
    for(let i = 1; i < snake.length; i++) {
        if(apple.xAppleCoord == snake[i].xCoord || apple.yAppleCoord == snake[i].yCoord){
            randomizeApple(fieldSize);
        }
    }
    mas[apple.yAppleCoord][apple.xAppleCoord] = 3;
}

randomizeApple(fieldSize);

document.querySelector(".start-button").onclick = function startSnake() {
    if (directions[0] == undefined) {
        directions = [0, 0, 1, 0];
        return;
    }
    
    let checkerDirection = true; // дает определить направление движения только один раз за такт, что защищает от "переклацывания" в противоположную сторону
    document.body.onkeydown = function catchDirecton (event) {
        if(!checkerDirection){
            return;
        }
        checkerDirection = false;
        if(event.keyCode == 37 && previousKeyKode != 39) {
            directions = [1,0,0,0]; previousKeyKode = 37;
        } else if(event.keyCode == 37 && previousKeyKode == 39) {
            directions = [0,0,1,0];
        }
        if(event.keyCode == 38 && previousKeyKode != 40) {
            directions = [0,1,0,0]; previousKeyKode = 38;
        } else if(event.keyCode == 38 && previousKeyKode == 40) {
            directions = [0,0,0,1];
        }
        if(event.keyCode == 39 && previousKeyKode != 37) {
            directions = [0,0,1,0]; previousKeyKode = 39;
        } else if(event.keyCode == 39 && previousKeyKode == 37) {
            directions = [1,0,0,0];
        }
        if(event.keyCode == 40 && previousKeyKode != 38) {
            directions = [0,0,0,1]; previousKeyKode = 40;
        } else if(event.keyCode == 40 && previousKeyKode == 38) {
            directions = [0,1,0,0];
        }
    };
    moveSnake(fieldSize);
//ГРАНИЧНЫЕ УСЛОВИЯ
    if(snake[0].yCoord == fieldSize/10-1 || snake[0].yCoord == 0 || snake[0].xCoord == fieldSize/10-1 || snake[0].xCoord == 0) {
        field(fieldSize);
        createSnake(fieldSize);
        randomizeApple(fieldSize);
        checkAndDraw(fieldSize);
        directions = [0, 0, 1, 0];
        showGameover();
        return;
    }
//ЕДИМ ЯБЛОКИ И РАНДОМАЙЗИМ НОВЫЕ
    if(snake[0].yCoord == apple.yAppleCoord && snake[0].xCoord == apple.xAppleCoord){
        addSnakeBlock(snake[0].yPrevCoord, snake[0].xPrevCoord);
        randomizeApple(fieldSize);
    }
//УСЛОВИЯ НЕПРОНИЦАЕМОСТИ ХВОСТА
    for(let i = 4; i < snake.length; i++) {
        if(snake[0].xCoord == snake[i].xCoord && snake[0].yCoord == snake[i].yCoord) {
            field(fieldSize);
            createSnake(fieldSize);
            randomizeApple(fieldSize);
            checkAndDraw(fieldSize);
            directions = [0, 0, 1, 0];
            showGameover();
            return;
        }
    }
    checkAndDraw(fieldSize);
    setTimeout(startSnake, speedValue);
};

function checkAndDraw (someValue) {
    ctx.clearRect(0, 0, someValue, someValue);
    for(let i = 0; i < someValue/10; i++) {
        for (let j = 0; j < someValue/10; j++) {
            if(mas[i][j] == 0) {
                ctx.beginPath();
                ctx.strokeStyle = "rgb(175, 175, 175)";
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
    randomizeApple(fieldSize);
    checkAndDraw(fieldSize);
    directions = [];
};

// ПОДСЧЕТ ОЧКОВ И ЭКРАН "GAME OVER"

let spanForLength = document.querySelector(".snakelength");

let gameoverScreen = document.querySelector(".gameover-screen");

function showGameover () {
    gameoverScreen.style.display = "flex";
    spanForLength.innerHTML = snake.length;
}
document.querySelector(".close-gameover").onclick = ()=> {
    gameoverScreen.style.display = "none";
}