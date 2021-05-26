// 获取游戏面板
var panel = document.querySelector('.panel');
// 获取随机食物 
var food = document.querySelector('.food');
// 获取贪吃蛇的头
var snakeH = document.querySelector('.snakeHead');
// 保存初始蛇
var snakeInit = document.querySelectorAll('.snakes');
// 获取贪吃蛇的尾巴
var snakeB;
// 游戏是否开始状态
var Status = false;
// 开始按钮
var start = document.querySelector('.start');
// 暂停按钮
var pause = document.querySelector('.pause');
// 重新开始
var restart = document.querySelector('.restart');
//向上方向盘
var up = document.querySelector('.up');
//向下方向盘
var down = document.querySelector('.down');
//向左方向盘
var left = document.querySelector('.left');
//向右方向盘
var right = document.querySelector('.right');
// 获取整条蛇
var snake = document.getElementById('snake');
// 游戏结束面板
var gameOver = document.querySelector('.gameOver');
// 结束面板中重新开始游戏
var refreshBtn = document.querySelector('.refreshBtn');
// 蛇的x，y位置
var snake_x = 0;
var snake_y = 0;
var snake_x_max = 600;
var snake_y_max = 600;
var direction = 'right';
var turn = '';
var food_x = 0;
var food_y = 0;
// 获取成绩name
var score = document.getElementById('score');
var timer;
// 监听开始游戏按钮
start.addEventListener('click', startGame);
pause.addEventListener('click', pauseGame);
restart.addEventListener('click', restartGame);
// 结束面板中重新开始游戏
refreshBtn.addEventListener('click', reGame);
// 生成随机食物
randFood();
// 控制方向按钮
up.addEventListener('click', function () { direction = 'top'; });
down.addEventListener('click', function () { direction = 'bottom'; });
left.addEventListener('click', function () { direction = 'left'; });
right.addEventListener('click', function () { direction = 'right'; });
// 按下键盘转换方向
document.onkeydown = function (evt) {
    var e = evt;
    // var e = evt || Event;
    var keyCode = e.keyCode || e.which;
    switch (keyCode) {
        case 37:
            if (turn === 'right') {
                direction = "right";
            }
            else {
                direction = 'left';
            }
            break;
        case 38:
            if (turn === 'bottom') {
                direction = "bottom";
            }
            else {
                direction = 'top';
            }
            break;
        case 39:
            if (turn === 'left') {
                direction = "left";
            }
            else {
                direction = "right";
            }
            break;
        case 40:
            if (turn === 'top') {
                direction = "top";
            }
            else {
                direction = "bottom";
            }
            break;
    }
};
// 改变方向
function turnDir() {
    var dir = 'up';
    switch (dir) {
        case 'left':
            if (turn === 'right') {
                direction = "right";
            }
            else {
                direction = 'left';
            }
            break;
        case 'up':
            if (turn === 'bottom') {
                direction = "bottom";
            }
            else {
                direction = 'top';
            }
            break;
        case 'right':
            if (turn === 'left') {
                direction = "left";
            }
            else {
                direction = "right";
            }
            break;
        case 'bottom':
            if (turn === 'top') {
                direction = "top";
            }
            else {
                direction = "bottom";
            }
            break;
    }
}
// 贪吃蛇自己移动
function snakeMove() {
    isTouch();
    snakeB = document.querySelectorAll('.snakes');
    switch (direction) {
        case 'right':
            snake_x += 30;
            break;
        case 'bottom':
            snake_y += 30;
            break;
        case 'left':
            snake_x -= 30;
            break;
        case 'top':
            snake_y -= 30;
            break;
    }
    // 判断撞墙
    strikeWall();
    for (var i = snakeB.length - 1; i > 0; i--) {
        // 添加蛇身的位置样式
        snakeB[i].style.left = snakeB[i - 1].style.left;
        snakeB[i].style.top = snakeB[i - 1].style.top;
    }
    // console.log(snakeB[i]);
    // 确定 蛇的左右位置
    snakeB[0].style.left = snake_x + 'px';
    snakeB[0].style.top = snake_y + 'px';
    // console.log(snakeB[i].style.left);
    // console.log(snakeB[i].style.top);
    strikeTail();
}
// 判断是否撞上尾巴
function strikeTail() {
    snakeB = document.querySelectorAll('.snakes');
    for (var i = 1; i < snakeB.length - 1; i++) {
        if (snakeB[0].style.left === snakeB[i].style.left && snakeB[0].style.top === snakeB[i].style.top) {
            clearInterval(timer);
            gameOver.style.display = 'block';
            Status = false;
            isDisable();
            return;
        }
    }
}
// 判断是否撞墙
function strikeWall() {
    if ((snake_x + 30) > snake_y_max || snake_x < 0 || snake_y < 0 || (snake_y + 30) > snake_y_max) {
        clearInterval(timer);
        gameOver.style.display = 'block';
        Status = false;
        isDisable();
        return;
    }
}
// 开始游戏
function startGame() {
    Status = true;
    isDisable();
    // 移动的定时器
    timer = setInterval(function () {
        // 保留本来的移动方向
        turn = direction;
        // 移动
        snakeMove();
    }, 200);
}
// 判断是否开始游戏
function isDisable() {
    if (Status) {
        // 游戏开始后隐藏按钮
        start.style.display = 'none';
    }
    else {
        // 游戏暂停或者结束后,显示开始按钮
        start.style.display = 'block';
    }
}
// 暂停游戏
function pauseGame() {
    Status = false;
    isDisable();
    clearInterval(timer);
}
// 重新开始游戏
function restartGame() {
    snakeB = document.querySelectorAll('.snakes');
    // 隐藏遮光板
    gameOver.style.display = "none";
    // 将蛇还原至初始位置和方向
    snake_x = 0;
    snake_y = 0;
    direction = 'right';
    turn = '';
    // 分数清零
    score.value = '0';
    //  移除子节点
    for (var i = 1; i < snakeB.length - 1; i++) {
        var div = snakeB[i];
        div.parentNode.removeChild(div);
    }
    // 给蛇身赋初始值
    snakeB = snakeInit;
    // 确定 蛇头的左右位置
    snakeB[0].style.left = 0 + 'px';
    snakeB[0].style.top = 0 + 'px';
    snakeB[1].style.left = 0 + 'px';
    snakeB[1].style.top = 0 + 'px';
    // 将开始按钮显示出来
    Status = false;
    isDisable();
    // 停止计时器
    clearInterval(timer);
    // 更改随机食物位置
    randFood();
}
// 结束游戏面板中重新开始游戏
function reGame() {
    refreshBtn.style.display = 'block';
    restartGame();
}
// 生成随机食物
function randFood() {
    snakeB = document.querySelectorAll('.snakes');
    food_x = randomNum();
    food_y = randomNum();
    //食物避免和蛇身重叠
    for (var i = 0; i < snakeB.length - 1; i++) {
        if (snakeB[i].style.left === food_x + 'px' && snakeB[i].style.top === food_y + 'px') {
            food_x = randomNum();
            food_y = randomNum();
        }
    }
    food.style.left = food_x + 'px';
    food.style.top = food_y + 'px';
}
// 随机生成3的倍数
function randomNum() {
    var num = parseInt(Math.random() * 10) * 30;
    return (num * 2);
}
// 判断食物是否和蛇头发生接触
function isTouch() {
    if (snake_x === food_x && snake_y === food_y) {
        eatFood();
    }
}
// 吃食物
function eatFood() {
    // 生成随机食物
    randFood();
    // 长尾巴
    addBody();
    // 增加分数
    addScore();
}
// 长尾巴
function addBody() {
    // 蛇尾巴
    var snakeTail = document.createElement("div");
    snakeTail.classList.add('snakes');
    snake.insertBefore(snakeTail, snake.childNodes[2]);
}
// 累加分数
function addScore() {
    var num = parseInt(score.value) + 1;
    score.value = num.toString();
}
