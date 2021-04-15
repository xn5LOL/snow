const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var snowImg, snowManImg, snowBallImg, boy1Img, girl1Img;
var girl1, boy1, snowMan, snowBall;
var engine, world;
var maxFlakes = 10;
var flakes = [];
var snowCreatedFrame = 0;
var slingShot;
var snowFallingMusic;

function preload() {
  snowImg = loadImage("snow2.jpg");
  snowManImg = loadImage("snowman.jpg");
  snowBallImg = loadImage("snowball.png");
  boy1Img = loadImage("boy1.jpg");
  girl1Img = loadImage("girl1.png");
  snowFallingMusic = loadSound("JoyMusic.mp3");

}

function setup() {
  createCanvas(1280,720);
  snowFallingMusic.loop();
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  snowMan = createSprite(1000, 600);
  snowMan.addImage("snowman",snowManImg);
  snowMan.scale = 0.2;

  boy1 = createSprite(700, 600);
  boy1.addImage("boy1",boy1Img);
  boy1.scale = 0.18;

  girl1 = createSprite(300, 600);
  girl1.addImage("girl1", girl1Img);
  girl1.scale = 0.5;

  snowBall = Bodies.circle(350,600,20);
  World.add(world,snowBall);

  if(frameCount % 5000 === 0){
    for(var i=0; i<maxFlakes; i++){
        flakes.push(new snowFlake(random(0,1280), random(0,720)));
    }
}
slingShot = new SlingShot(this.snowBall,{x:350,y:600});
}

function draw() {
  background(snowImg); 
  textSize(30);
  fill("black");
  text("Drag the snowball to hit the boy", 400, 30);
  text("Press Space key to return the snowball to its original position", 250, 60);
  drawSprites();
  slingShot.display();
  Engine.update(engine);
  imageMode(CENTER)
  image(snowBallImg ,snowBall.position.x,snowBall.position.y,40,40);
  for(var i = 0; i<maxFlakes; i++){
    flakes[i].showFlake();
    flakes[i].updateY();
}
}
function mouseDragged(){
  Matter.Body.setPosition(this.snowBall,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.snowBall);
  }
}