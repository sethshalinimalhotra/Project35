const FULL = 1;
const EMPTY = 0 ;
var dog ,dogImg, happyDog, database, foodS,foodStock;

var stock = FULL;
function preload()
{
  dogImg = loadImage("images/dogimg.png");
  happyDog = loadImage("images/dogimg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage("mydog",dogImg);
  dog.scale = 0.5;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  if(foodS!== undefined){
    if(foodS>=1){
      dog.addImage("hp",happyDog);
      dog.changeImage("hp",happyDog);
      foodS = foodS - 1 ;
      writeStock(foodS);
    }else
    {
      dog.changeImage("mydog",dogImg);
    }
  }
}
  drawSprites();
  textSize(10);
  
  if(stock == FULL){
    stroke(255);
  fill("black");
  text("Note : Press UP ARROW key to feed DRAGO milk",10,450);
  }
  else{
    stroke(255);
  fill("red");
  text("Alert: Milk is over",10,450);
  }

}
function readStock(data){
foodS = data.val();
if(foodS<=0){
  stock = EMPTY;
}
}
function writeStock(x){
  database.ref('/').update({
    Food: x
  });
}


