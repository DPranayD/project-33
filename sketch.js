
const Engine = Matter.Engine; 
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint  
var engine, world;

var backgroundImg;

function preload(){
  getTime();
}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
	world = engine.world;

  POLYGON = new Polygon(50,200,20);
  GROUND = new ground(400,400,800,50);
  Stand1 = new ground(390,315,240,20);

  //1st floor
  object1 = new Box(330,235,30,40);
  object2 = new Box(360,235,30,40);
  object3 = new Box(390,235,30,40);
  object4 = new Box(420,235,30,40);
  object5 = new Box(450,235,30,40);
  //2nd floor
  object6 = new Box(360,195,30,40);
  object7 = new Box(390,195,30,40);
  object8 = new Box(420,195,30,40);
  //Top floor
  object9 = new Box(390,155,30,40);
  ball=Bodies.circle(50,200,20);
  World.add(world,ball);

  Slingshot = new Launcher(this.ball,{x:150,y:200})


  Engine.run(engine);
}

function draw() {
  if(backgroundImg)
        background(backgroundImg);  

  Engine.update(engine);
  GROUND.display();
  Stand1.display();
  object1.display();
  object2.display();
  object3.display();
  object4.display();
  object5.display();
  object6.display();
  object7.display();
  object8.display();
  object9.display();
  //POLYGON.display();
  Slingshot.display();

  ellipse(ball.position.x,ball.position.y,40,40);

  drawSprites();
}

function mouseDragged() {
  Matter.Body.setPosition(this.ball,{x:mouseX,y:mouseY})
}

function mouseReleased(){
  Slingshot.fly()
}

function keyPressed(){
  if(keyCode === 32){
      Slingshot.attach(ball);
      
  }
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responsejson = await response.json()
  var datetime = responsejson.datetime
  console.log(datetime);
  console.log(datetime.slice(11,13));
  var hour = datetime.slice(11,13);
  if(hour >= 06 && hour <= 18){
      bg = "lightblue.jpg";
  } 
  else{
      bg = "darkblue.jpg"
  }
  backgroundImg = loadImage(bg); 
}