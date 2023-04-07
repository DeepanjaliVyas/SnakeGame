
let inputDir= {x: 0, y: 0};
let foodSound = new Audio('../mp3/food.mp3');
let gameOverSound =  new Audio('../mp3/dead.mp3');
let speed = 3;
let lastPaintTime = 0;
let Score = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x:6, y: 7};
// game function
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }}
        if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0)
        return true;
    
}

function gameEngine(){
    // update snake
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x:0, y:0};
        alert("Game over.Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        Score = 0;
    }
    // if snake have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        Score +=1;
        if(Score > highscoreval){
            highscoreval = Score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            highscoreBox.innerHTML = "highscore: "+highscoreval;
        }
        ScoreBox.innerHTML = "Score: "+Score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y+ inputDir.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};

    }
    // moving the snake
 for(let i=snakeArr.length-2; i>=0; i--){
     
     snakeArr[i+1] = {...snakeArr[i]};
 }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement =document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display food
    foodElement =document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
//main logic start here
let highscore = localStorage.getItem("highscore");
if(highscore=== null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval =JSON.parse(highscore);
    highscoreBox.innerHTML = "highscore: "+highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1} //start the game
    switch(e.key){
        case "ArrowUp": console.log("ArrowUp")
                        inputDir.x = 0;
                        inputDir.y =-1;
                          break;
        case "ArrowDown": console.log("ArrowDown")
                        inputDir.x = 0;
                         inputDir.y =1;
                            break;
        case "ArrowLeft": console.log("ArrowLeft")
                          inputDir.x = -1;
                         inputDir.y =0;
                            break;
        case "ArrowRight": console.log("ArrowRight")
                          inputDir.x = 1;
                           inputDir.y =0;
                            break;   

         default:  break;
                        }
})