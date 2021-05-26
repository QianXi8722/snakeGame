// 获取游戏面板
let panel = document.querySelector('.panel') as HTMLDivElement
// 获取随机食物 
let food = document.querySelector('.food') as HTMLDivElement
// 获取贪吃蛇的头
let snakeH = document.querySelector('.snakeHead') as HTMLDivElement
// 保存初始蛇
let snakeInit = document.querySelectorAll('.snakes')
// 获取贪吃蛇的尾巴
let snakeB
// 游戏是否开始状态
let Status = false
// 开始按钮
let start = document.querySelector('.start') as HTMLDivElement
// 暂停按钮
let pause = document.querySelector('.pause') as HTMLButtonElement
// 重新开始
let restart = document.querySelector('.restart') as HTMLButtonElement

//向上方向盘
let up = document.querySelector('.up') as HTMLButtonElement
//向下方向盘
let down = document.querySelector('.down') as HTMLButtonElement
//向左方向盘
let left = document.querySelector('.left') as HTMLButtonElement
//向右方向盘
let right = document.querySelector('.right') as HTMLButtonElement
// 获取整条蛇
let snake = document.getElementById('snake')
// 游戏结束面板
let gameOver = document.querySelector('.gameOver') as HTMLDivElement
// 结束面板中重新开始游戏
let refreshBtn = document.querySelector('.refreshBtn') as HTMLButtonElement
// 蛇的x，y位置
let snake_x = 0
let snake_y = 0
let snake_x_max = 600
let snake_y_max = 600
let direction = 'right'
let turn = ''
let food_x = 0
let food_y = 0
// 获取成绩name
let score = document.getElementById('score') as HTMLInputElement
let timer
// 监听开始游戏按钮
start.addEventListener('click',startGame)
pause.addEventListener('click',pauseGame)
restart.addEventListener('click',restartGame)
// 结束面板中重新开始游戏
refreshBtn.addEventListener('click',reGame)
// 生成随机食物
randFood()
// 控制方向按钮
up.addEventListener('click', function(){ direction = 'top'})
down.addEventListener('click', function(){ direction = 'bottom'})
left.addEventListener('click', function(){ direction = 'left'})
right.addEventListener('click', function(){ direction = 'right'})
// 按下键盘转换方向
document.onkeydown = function(evt){
    var e = evt;
    // var e = evt || Event;
    var keyCode = e.keyCode || e.which;
    switch( keyCode ){
      case 37: 
        if(turn === 'right'){
            direction = "right";
        }else{
            direction = 'left'
        }
        break;
      case 38:
        if(turn === 'bottom'){
            direction = "bottom";
        }else{
            direction = 'top'
        } 
        break;
      case 39: 
        if(turn === 'left'){
            direction = "left";
        }else {
            direction = "right";
        }
        
        break;
      case 40: 
        if(turn === 'top'){
            direction = "top";
        }else {
            direction = "bottom";
        }
       
        break;
    }
}
// 改变方向
function turnDir() {
    let dir='up'
    switch( dir ){
        case 'left': 
          if(turn === 'right'){
              direction = "right";
          }else{
              direction = 'left'
          }
          break;
        case 'up':
          if(turn === 'bottom'){
              direction = "bottom";
          }else{
              direction = 'top'
          } 
          break;
        case 'right': 
          if(turn === 'left'){
              direction = "left";
          }else {
              direction = "right";
          }
          
          break;
        case 'bottom': 
          if(turn === 'top'){
              direction = "top";
          }else {
              direction = "bottom";
          }
         
          break;
      }
}
// 贪吃蛇自己移动
function snakeMove(){
    isTouch()
    snakeB = document.querySelectorAll('.snakes')
    switch(direction) {
         case 'right':
             snake_x += 30
             break;
         case 'bottom':
             snake_y += 30
             break;
         case 'left':
             snake_x -= 30
             break;
         case 'top':
             snake_y -= 30
             break;
    }
    // 判断撞墙
    strikeWall()
    for(var i = snakeB.length - 1; i > 0; i--) {
         // 添加蛇身的位置样式
        snakeB[i].style.left = snakeB[i - 1].style.left
        snakeB[i].style.top = snakeB[i - 1].style.top
    }
    // console.log(snakeB[i]);
    
    // 确定 蛇的左右位置
    snakeB[0].style.left = snake_x + 'px'
    snakeB[0].style.top = snake_y + 'px'
    // console.log(snakeB[i].style.left);
    // console.log(snakeB[i].style.top);
    strikeTail()
}
// 判断是否撞上尾巴
function strikeTail() {
    snakeB = document.querySelectorAll('.snakes')
    for(let i = 1; i < snakeB.length - 1; i++){
        if(snakeB[0].style.left === snakeB[i].style.left && snakeB[0].style.top === snakeB[i].style.top){
            clearInterval(timer)
            gameOver.style.display = 'block'
            Status = false
            isDisable()
            return
        }
    }
    
}
// 判断是否撞墙
function strikeWall() { 
    if((snake_x + 30) > snake_y_max || snake_x < 0 || snake_y < 0 || (snake_y + 30) > snake_y_max) {
        clearInterval(timer)
        gameOver.style.display = 'block'
        Status = false
        isDisable()
        return
    }
}
// 开始游戏
function startGame() {
    Status = true
    isDisable()
    // 移动的定时器
    timer =  setInterval(function(){
        // 保留本来的移动方向
        turn = direction
        // 移动
        snakeMove()
    },200)
}
// 判断是否开始游戏
function isDisable() {
    if(Status) {
        // 游戏开始后隐藏按钮
        start.style.display = 'none'
    }else {
        // 游戏暂停或者结束后,显示开始按钮
        start.style.display = 'block'
    }
}
// 暂停游戏
function pauseGame () {
    Status = false
    isDisable()
    clearInterval(timer)
}
// 重新开始游戏
function restartGame() {
    snakeB = document.querySelectorAll('.snakes')
    // 隐藏遮光板
    gameOver.style.display = "none"
    // 将蛇还原至初始位置和方向
    snake_x = 0
    snake_y = 0
    direction = 'right'
    turn = ''
    // 分数清零
    score.value = '0'
    //  移除子节点
    for(let i = 1 ; i < snakeB.length - 1; i++ ){
        let div = snakeB[i] as HTMLDivElement
        div.parentNode.removeChild(div)
    }
    // 给蛇身赋初始值
    snakeB = snakeInit
    // 确定 蛇头的左右位置
    snakeB[0].style.left = 0 + 'px'
    snakeB[0].style.top = 0 + 'px'
    snakeB[1].style.left = 0 + 'px'
    snakeB[1].style.top = 0 + 'px'
    // 将开始按钮显示出来
    Status = false
    isDisable()
    // 停止计时器
    clearInterval(timer)
    // 更改随机食物位置
    randFood()
}
// 结束游戏面板中重新开始游戏
function reGame () {
    refreshBtn.style.display = 'block'
    restartGame()
}
// 生成随机食物
function randFood() {
    snakeB = document.querySelectorAll('.snakes')
    food_x = randomNum()
    food_y = randomNum()
    //食物避免和蛇身重叠
    for(let i = 0; i < snakeB.length - 1; i++ ) {
        if(snakeB[i].style.left === food_x+'px' && snakeB[i].style.top === food_y+'px'){
            food_x = randomNum()
            food_y = randomNum()
        }
    }
    food.style.left = food_x+'px'
    food.style.top = food_y+'px' 
}
// 随机生成3的倍数
function randomNum(){
    
    let num = parseInt(Math.random()*10)*30
    return (num*2)
    
}
// 判断食物是否和蛇头发生接触
function isTouch() {
    if(snake_x === food_x && snake_y === food_y) {
        eatFood()
    }
}
// 吃食物
function eatFood() {
    // 生成随机食物
    randFood()
    // 长尾巴
    addBody()
    // 增加分数
    addScore() 
}
// 长尾巴
function addBody() {
    // 蛇尾巴
    let snakeTail = document.createElement("div")
    snakeTail.classList.add('snakes')

    snake.insertBefore(snakeTail, snake.childNodes[2])
}
// 累加分数
function addScore() {
    let num = parseInt(score.value) + 1
    score.value = num.toString()
}




    




