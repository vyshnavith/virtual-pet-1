//Create variables here
var dog, foodS, foodStock, dogImg, happyDogImg, database;
var feed, addFood, fedTime, lastFed, foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {

  database = firebase.database();
  createCanvas(1000, 400);
  foodObj = new Food();
  foodStock = database.ref('food');
    foodStock.on("value",readStock);
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;
    feed = createButton(" Feed the Dog ");
    feed.position(800, 95);
    feed.mousePressed(feedDog);
    addFood = createButton(" Add Food ");
    addFood.position(900,95);
    addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);
foodObj.display();
fedTime = database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});
fill(255,255,254);
  textSize(40);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 50,40);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",50,80);
   }else{
     text("Last Feed : "+ lastFed + " AM", 50,40);
   }
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}