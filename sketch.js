var bg,bgImg;
var play,playButtton,start,startButton
var ballGroup
var penalty = 5
var score = 0
var restartImg,restart
var edges
var gameState = "play"
var gameOverSound
var catchSound
function preload(){
  bgImg=loadImage("grass.jpg")
playButton=loadImage("how play.png")
startButton=loadImage("start.png")
  goalImage=loadImage("goal.png")
  goalieImage=loadImage("goalie.png")
  ballImage=loadImage("ball.png")
  restartImg = loadImage("restart.png")
  gameOverSound = loadSound("gameover.mp3")
  catchSound = loadSound("ball catch.wav")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
goal= createSprite(100,300)
goal.addImage(goalImage)
goal.scale=2

goal.setCollider("rectangle",0,0,200,220)

goalie= createSprite(500,300)
goalie.addImage(goalieImage)
goalie.scale=0.5

goalie.setCollider("circle", 0,0, 80)


restart = createSprite(800,350)
restart.addImage(restartImg)
restart.scale = 0.5
restart.visible = false
ballGroup = new Group()
edges = createEdgeSprites()

}

function draw() {
  if(gameState == "play")
  {
  background(bgImg); 
  if(gameOverSound.isPlaying())
  {
    gameOverSound.stop()
  }
  restart.visible = false
if(keyDown(UP_ARROW)){
  goalie.y-=5
}
if(keyDown(DOWN_ARROW)){
  goalie.y+=5
}

for (var i = 0;i<ballGroup.length;i++){
  if(goalie.isTouching(ballGroup[i]))
  {
    ballGroup[i].destroy()
    score =score+1
    catchSound.play()
  }
}
for (var i = 0;i<ballGroup.length;i++){
  if(goal.isTouching(ballGroup[i]))
  {
    ballGroup[i].destroy()
    penalty-=1

  }
}
 makeBalls()

drawSprites();

textSize(30)
fill("black")
text("Life: "+ penalty, windowWidth-200,100)
text("Saves: "+ score, windowWidth-200,300)
if(penalty<=0)
{
  gameState = "over"
  gameOverSound.play()
}
}


if(gameState === "over"){
background("lightgreen")
restart.visible = true
drawSprites()
textSize(30)
fill("black")
text("Saves: "+ score, 700,250)

if(mousePressedOver(restart))
{
  gameState = "play"
  score = 0
  penalty = 5
  
}
ballGroup.destroyEach()
}
goalie.collide(edges)
}
function makeBalls(){
if(frameCount%30===0){
  ball=createSprite(windowWidth,100)
  ball.scale=0.25
  ball.addImage(ballImage)
  ball.y=Math.round(random(100,displayHeight-200))
  ball.velocityX=-16
  goalie.depth = ball.depth+1
  ballGroup.add(ball)
}
}
