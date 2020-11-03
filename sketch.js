var back,backImage;
var door,doorImage,doorGroup;
var rand;
var railing,railingImage,railingGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleblockGroup;
var gameState="play";




function preload(){
  backImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  railingImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");

}


function setup(){
  createCanvas(600,600);


  back=createSprite(300,300,0,0);
  back.addImage("background", backImage);
  back.velocityY=2;
  doorGroup=new Group();
   
  railingGroup=new Group();
  
  ghost=createSprite(300,300,0,0);
  ghost.addImage("GHOST!", ghostImage);
  ghost.scale= 0.4;
  
  invisibleblockGroup=new Group();
  
}

function draw(){
  background("black");
  
 
      if (gameState==="play"){
         if(back.y>600){
    back.y=300;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  }

 if (keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  if (keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(ghost.isTouching(railingGroup)){
    ghost.velocityY=0;
  }
        if(ghost.isTouching(doorGroup)||ghost.y>600){
          gameState="end"
          ghost.destroy();
        }
         gate();
  drawSprites();
      }
  
  else if(gameState==="end"){
     fill("red");
    textSize(50);
    text("GAME OVER!",200,300);
  }
  
 
}

function gate(){
  if (frameCount%200===0){
    
    door=createSprite(200,-2,0,0)
    door.addImage("door",doorImage);
    door.velocityY=2;
    rand=Math.round(random(100,400))
    door.x=rand;
    door.lifetime=300;
    doorGroup.add(door);
    
    railing=createSprite(100,45,0,0)
    railing.addImage("railing",railingImage);
    railing.velocityY=2;
    railing.x=door.x;
    railing.lifetime=300;
    railingGroup.add(railing);
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
      railing.debug=true;
    invisibleBlock=createSprite(200,50,0,0);
    invisibleBlock.width=railing.width
    invisibleblockGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    invisibleBlock.velocityY=2;
    invisibleBlock.x=door.x;
  }
 
}

