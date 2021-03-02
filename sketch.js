var PLAY = 1;
  var END = 0;
  var gameState = 1;

var monkey , monkey_running;
var food ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,groundImage;
var survivalTime;
var score = 0;
var survivalTime = 0; 
var eatingSound,dyingSound;
var gameOver,gameOverImage;
var restart,restartImage;
var invisibleGround;

function preload(){
  
  
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png",                     "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 eatingSound = loadSound("Chewing-popcorn-single-crunch-B-www.fesliyanstudios.com.mp3");
  
  gameOverImage = loadImage("game over.jpg");
  restartImage = loadImage("game-result-restart.png");
  groundImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(400,400);
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score : ",300,50);

  
  var score = 0;
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score,500,50);
  
  ground = createSprite(200,200,900,10);
 ground.addImage(groundImage);
  ground.scale = 0.6;
  
  
    
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
 
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(200,210,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
    
  restart = createSprite(200,310,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  restart.visible = false;
  
  invisibleGround = createSprite(200,350,900,10);
  invisibleGround.visible = false;
  
}


function draw() {

  background("blue");
  
  

   

    
   monkey.velocityY = monkey.velocityY + 1;
  
  if(gameState === PLAY){
    
    survivalTime = Math.round(score * 2);
   
    
    if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -20;
      
       survivalTime = (score * 2)
  switch(survivalTime){
      
      
    case 10: monkey.scale = 0.12;
    break;
      
    case 20: monkey.scale = 0.14;
    break;
      
       
    case 30: monkey.scale = 0.16;
    break;
    
      
    case 40: monkey.scale = 0.18;
    break;
      
    default: break;
       
  }
       
      }
    ground.velocityX = -(4 + (survivalTime/8));
 
  ground.visible = true;
 
    
  } else if(gameState === END){
    ground.velocityX = 0;
    food.velocityX = 0;
    obstacle.velocityX = 0;
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    restart.visible = true;
    gameOver.visible = true;
    ground.visible = false;
    
   
  }
 
   
    
  
  
  if(foodGroup.isTouching(monkey)){

    foodGroup.destroyEach();
    
    eatingSound.play();
    
    score = score + 1;
    
    
  }
  
   
  if(obstacleGroup.isTouching(monkey)){

    gameState = END;
    
    monkey.scale = 0.1;
    
  }
  
    if(frameCount % 80 === 0 && gameState === PLAY){
    
  food = createSprite(300,(Math.round(random(130,250))),10,10);
  food.addImage(bananaImage);
  food.scale = 0.15;
  food.lifetime = 200;
  food.velocityX = -(4 + 0.1);
  food.depth = gameOver.depth-1;
      
  foodGroup.add(food);
  }    
  
  if(frameCount % 200=== 0 && gameState === PLAY){
    
  obstacle = createSprite(300,328,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.11;
  obstacle.velocityX = -(4 + 0.1);
  obstacle.lifetime = 200;
   obstacle.depth = gameOver.depth-1;
    
  obstacleGroup.add(obstacle);
   
  }

  function reset(){
    gameState = PLAY;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
    score = 0;
    survivalTime = 0;
     
    
    
  }
  
  if(mousePressedOver(restart) && gameState === END){
    reset();
  }
  
  if(ground.x < 100){
    ground.x = 200;
  }
  
  monkey.collide(invisibleGround);
  
drawSprites();
  
   
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time : " + survivalTime,200,50);
  

   
  stroke("black");
  textSize(20);
  fill("black");
  text("Score : " + score,100,50);
}