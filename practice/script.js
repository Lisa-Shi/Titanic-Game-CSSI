/* global p5 */

let p = new p5(() => {});

let backgroundColor,
  spherePosition,
  rectPosition,
  invisibleObjects,
  width,
  img,
  hasGameEnded;
let allObjects = [];
let spritePosition;
let wallPaper;

function begin() {
  spritePosition = {
    x: p.random(width * 2/3
               ) + 10,
    y: width - 80
  };
  allObjects = [];
  generateInvisibleObjects();
}

p.setup = function() {
  wallPaper = p.loadImage(
    "https://cdn.glitch.com/d8523266-544a-4cba-9523-3d8440d6413e%2Fdownload.png?v=1595308994507"
  );
  img = p.loadImage(
    "https://cdn.glitch.com/d8523266-544a-4cba-9523-3d8440d6413e%2FCC62EA78-A26F-476B-B612-4E61A408A223.png?v=1595305533553"
  );

  width = 450;
  p.createCanvas(450, 450);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  p.background(237, 88, 10);
  p.fill(30);
  
  p.text("You have just fallen off the titanic.", width/2, width/2)
  p.text("Thank goodness for your life vest that can also sense nearby debris.")
  p.text("Get to the top to survive and avoid the debris!")
  p.text("press enter to start")
  p.noLoop();
  begin();
};

p.draw = function() {
  p.fill(50);

  p.image(img, spritePosition.x, spritePosition.y);

  let distanceMouseObjects = [];
  p.background(237, 88, 10);

  for (var objects of allObjects) {
    //draws the invisible objects
    //p.rect(objects.x, objects.y, 30, 30);
    //console.log("draw")
    var num = computeDistance(objects, spritePosition);
    distanceMouseObjects.push(num);
  }

  let smallestDistance = computeMinimumDistance(distanceMouseObjects);
  let distanceDescription = computeCategoryofDistance(smallestDistance);
  if (success()) {
    distanceDescription = "winner";
  }

  p.image(wallPaper, 0, 0, p.width, p.width / 3);
  p.image(img, spritePosition.x, spritePosition.y, 80, 60);

  //p.image(wallPaper,150, 150, 80, 60);
  p.fill(backgroundColor);
  p.ellipse(spritePosition.x + 38, spritePosition.y + 30, 12, 15);
  p.text(`you're ${distanceDescription}`, spritePosition.x, spritePosition.y);

  move();
  success();
};

function generateInvisibleObjects() {
  for (let i = 0; i < 5; i++) {
    
    let possibleX = 0;
    let possibleY = 0;
    let possibleDistance = 0;
    
    invisibleObjects = {
      x: possibleX,
      y: possibleY
    };

    
    while (possibleDistance < 40) {
      invisibleObjects.x = p.random((8 * width) / 9);
      invisibleObjects.y = p.random((2 * width) / 3) + width / 3
      possibleDistance = computeDistance(invisibleObjects, spritePosition)
  
    }

    allObjects.push(invisibleObjects);
  }
  console.log("make");
}
function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = p.sqrt(deltaX ** 2 + deltaY ** 2);
  return p.abs(distance);
}

function computeCategoryofDistance(distance) {
  // let distance = computeDistance(point1, point2);
  if (distance > 200) {
    backgroundColor = p.color(240, 10, 100);
    return "safe";
  } else if (distance > 60) {
    backgroundColor = p.color(120, 10, 100);
    return "struggling";
  } else if (distance > 30) {
    backgroundColor = p.color(0, 10, 100);
    return "in danger";
  } else {
    p.noLoop();
    p.text("END GAME", width / 2, width / 2);
    return "impaled";
  }
}

function computeMinimumDistance(arrayOfInvisibleObjects) {
  let length = arrayOfInvisibleObjects.length;
  let min = arrayOfInvisibleObjects[0];
  for (var object of arrayOfInvisibleObjects) {
    if (object < min) {
      min = object;
    }
  }
  return min;
}

function move() {
  if (spritePosition.x < width && spritePosition.x > 0 && spritePosition.y > 0 && spritePosition.y < width) {
  
    if (p.keyIsDown(p.LEFT_ARROW)) {
      spritePosition.x -= 5;
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      spritePosition.x += 5;
    } 
  
  
  else if (p.keyIsDown(p.UP_ARROW)) {
      spritePosition.y -= 5;
    } else if (p.keyIsDown(p.DOWN_ARROW)) {
      spritePosition.y += 5;
    }
  }
}

function keyPressed() {
  if (p.keyCode === p.ENTER) {
    p.loop();
    begin();
  }
}

function success() {
  if (spritePosition.y < p.width / 3 - 10) {
    spritePosition.y -= 3;
    //p.noLoop();
    p.text("winner", 20, 20);
    // p.noLoop();
    return true;
  }
  return false;
}
