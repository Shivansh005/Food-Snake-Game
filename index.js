//Game constansts;
let inputDir={x:0 , y:0};
let foodsound=new Audio('music/food.mp3');
let gameoverSound=new Audio('music/gameover.mp3');
let movesound=new Audio('music/move.mp3');
let musicsound=new Audio('music/music.mp3');
let highscoresound=new Audio('music/Highscore.mp3');
let speed=10;
let score=0;
let lastPaintTime=0;
let SnakeaArr=[{x:13,y:15}];
 food={x:6,y:7};

//Game fucntion
function main(curr_time)
{
    window.requestAnimationFrame(main);  //we created Game loop;  
    
//    console.log(curr_time);
    if((curr_time - lastPaintTime)/1000<1/speed)
    {
        return;
    }  
    lastPaintTime=curr_time;
    gameEngine();
}
    //Game over collision and conditon
    function isCollide(snake)
    {
        //if you bump into yourself;
        for(let i=1;i<SnakeaArr.length;i++)
        {
            //if you bite yourself and end your game;
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        
        }
            //now if snake is going out side of the grid;
            if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
            {
                return true;
            }
        
    }
function gameEngine()
{
    //Part 1 Updating a snake variable using array;
    //like if snake eat something or collide .....
    musicsound.play();
    if(isCollide(SnakeaArr))
    {
        musicsound.pause();
        gameoverSound.play();
        inputDir={x:0 , y:0};
        alert("Game over ,Press any key to play again!");
        SnakeaArr=[{x:13,y:15}];
        musicsound.play();
        score=0;
    }    
    //If the snake eaten the food we will do increment the score and replace the food somewhere;
    if(SnakeaArr[0].y === food.y && SnakeaArr[0].x===food.x) //Means the cordinate of snake and food is equal;)
    {
        foodsound.play();
        score+=50;
        
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highscore.innerHTML = "HiScore: " + hiscoreval;   
        }
        scorebox.innerHTML="Score: " + score;
        SnakeaArr.unshift({x:SnakeaArr[0].x + inputDir.x , y:SnakeaArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x:Math.round(a+(b-a) * Math.random()),y:Math.round(a+(b-a) * Math.random())};
    }
    //For moving the snake in any direction:)
    for(let i=SnakeaArr.length -2;i>=0;i--)
    {
        SnakeaArr[i+1].x = SnakeaArr[i].x;
        SnakeaArr[i+1].y = SnakeaArr[i].y;
    }
        SnakeaArr[0].x+=inputDir.x;
        SnakeaArr[0].y+=inputDir.y;

    //part 2: we will render the snake and the food;
    board.innerHTML = "";

    //Displaying the snake;
    SnakeaArr.forEach((e,index)=>{   //for each using arow function;   
            snakeElement=document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if(index === 0)
            {
                snakeElement.classList.add('head');
            }
            else{
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
    });
    
    //Display the food   
    foodElement=document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food')
            board.appendChild(foodElement);



}

//Main logic starts here.....
window.requestAnimationFrame(main);
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscore.innerHTML="High Score: " + hiscore;
}
window.addEventListener('keydown',e=>{
    
    inputDir={x:0 ,y:1}; //The Game is started;
    musicsound.play();
    movesound.play();
    switch (e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

            case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

            case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

            case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
    } 
});