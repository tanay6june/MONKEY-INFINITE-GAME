var monkey, monkey_running, monkey_go;
var banana, banana_image, obstacle, obstacle_image
var foodgroup, enemygroup;
var score, ground, time;
var PLAY = 1
var END = 0
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");
  monkey_go = loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(500, 500)
  score = 0
  time = 0

  monkey = createSprite(100, 400, 10, 10)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("ded", monkey_go)
  monkey.scale = 0.1

  ground = createSprite(300, 400, 600, 10)
  ground.velocityX = -6
  ground.x = ground.width / 2

  foodgroup = createGroup();
  enemygroup = createGroup();
}


function draw() {
  background(225);
  monkey.velocityY = monkey.velocityY + 0.6
  monkey.collide(ground)
  var rand = Math.round(random(40, 200));
  var rand2 = Math.round(random(600, 700));
  if (ground.x < 300) {
    ground.x = 300
  }

  if (gameState === PLAY) {
    time = Math.ceil((frameCount / frameRate()))
    if (keyDown("space") && monkey.y > 410) {
      monkey.velocityY = -20
    }
    if (keyDown("down") && monkey.y < 410) {
      monkey.velocityY = 15
    }
    if (frameCount % 125 === 0) {
      banana = createSprite(600, rand, 10, 10)
      banana.velocityX = -6
      banana.scale = 0.1
      banana.addImage(banana_image)
      banana.lifetime = 300
      foodgroup.add(banana)
    }
    if (monkey.isTouching(foodgroup)) {
      score = score + 10
      foodgroup.destroyEach();
    }
    if (frameCount % 150 === 0) {
      obstacle = createSprite(rand2, 350, 10, 10)
      obstacle.velocityX = -6
      obstacle.scale = 0.25
     // obstacle.debug = true
      //obstacle.velocityY=obstacle.velocityY+1
      obstacle.collide(ground);
      obstacle.addImage(obstacle_image)
      obstacle.lifetime = 400
      enemygroup.add(obstacle)
      enemygroup.setColliderEach("rectangle", 0, 0, 400, 400)
    }
    if (monkey.isTouching(enemygroup)) {
      monkey.changeAnimation("ded", monkey_go);
      gameState = END

    }
  }
  if (gameState === END) {
    enemygroup.setLifetimeEach(-1);
    foodgroup.setLifetimeEach(-1);

    enemygroup.setVelocityEach(0, 0);
    foodgroup.setVelocityEach(0, 0);
    ground.setVelocity(0, 0);
    textSize(45)
    text("Game Over", 150, 200)
    text("R to restart", 150, 275)
    if (keyDown("r")) {
      Reset();
    }
  }
  drawSprites();
  fill(0)
  stroke(0)
  textSize(20)

  text("SurvivalTime :" + time, 200, 30)
//  text("score=" + score, 200, 30)

}

function Reset() {

  gameState=PLAY
  monkey.changeAnimation("running",monkey_running)
  ground.velocityX=-6
  enemygroup.destroyEach();
  foodgroup.destroyEach();
  time=0
  score=0
}