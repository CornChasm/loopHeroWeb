const mainBorder = document.querySelector(".mainBorder");

const rowArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
let temp = -1;
for (let index = 0; index < 252; index++) {
  mainBorder.appendChild(document.createElement("div"));
  if(index%21 == 0){temp++};
    mainBorder.children[index].dataset.row = `${rowArray[temp]}`;
    mainBorder.children[index].dataset.column = `${(index%21)}`;
    mainBorder.children[index].dataset.tile = `${mainBorder.children[index].dataset.row}${mainBorder.children[index].dataset.column}`;
    document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).style.backgroundColor = "yellow";

    document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).onclick = () => {
    console.log(mainBorder.children[index].dataset.tile);
    // console.log(mainBorder.children[index].dataset.tileType);
    // console.log(mainBorder.children[index].dataset.roadPlace);
    // TILE PLACING CODE
    if (mainBorder.children[index].dataset.tileType != "road" && mainBorder.children[index].dataset.tileType != "rim"){
      document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).style.backgroundColor = "blue";
      
    }
    if(document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).firstChild == undefined){
      switch(chosenTileBuild){
        case "forest":
          appendTileBuild(index, "forest", "forest.png")
          break;
        case "mountain":
          appendTileBuild(index, "mountain", "mountain.png");
          break;
        case "town":
          appendTileBuild(index, "town", "town.png")
          break;
        case "none":
          break;
      }
    }
  };
}

const w = "up";
const a = "left";
const s = "down";
const d = "right";
//const movementArray = [d, d, d, d, d, s, s, d, d, d, s, s, a, a, s, a, a, s, a, a, w, a, w, a, w, w, w];
const movementArray = [d, d, d, d, d, d, d, d, d, d, s, s, s, s, s, a, a, a, a, a, a, a, a, a, a, w, w, w, w];
let rowStart = 3;
let columnStart = 4;
let roadTrail = `${rowArray[rowStart]}${columnStart}`;
document
  .querySelector(`[data-tile="${roadTrail}"]`)
  .appendChild(document.createElement("div"))
  .setAttribute("id", "player");

const setTileTypes = function (rowStart, columnStart){
    if (document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart-1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart-1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart-1}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart-1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart-1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart-1}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart-1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart-1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart-1}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart+1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart+1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart+1}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart+1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart+1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart+1}"]`).style.backgroundColor = "pink";
    }
}

// console.log(movementArray.length)
for (let i = 0; i < movementArray.length+1; i++) {
  document.querySelector(`[data-tile="${roadTrail}"]`).style.backgroundColor = "red";
  document.querySelector(`[data-tile="${roadTrail}"]`).dataset.tileType = "road";
  document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
  document.querySelector(`[data-tile="${roadTrail}"]`).dataset.roadPlace = `${i}`;
  console.log(roadTrail + "_" + document.querySelector(`[data-tile="${roadTrail}"]`).dataset.roadPlace);
  setTileTypes(rowStart, columnStart);
  switch (movementArray[i]) {
    case s:
      rowStart++;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      break;
    case d:
      columnStart++;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      break;
    case w:
      rowStart--;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      break;
    case a:
      columnStart--;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      break;
  }
}

let playerPosition = 0;
let loopCount = 0;
let iterationStopped = true;
let maxPlayerPosition = movementArray.length+1;
let child = document.getElementById("player");
let parent = document.querySelector(`.road${playerPosition}`);

const playerMovement = function () {
  if(iterationStopped == false){
  console.log(playerPosition + "test");
  iterationStopped = false;
  document
    .querySelector(`.road${playerPosition}`)
    .removeChild(document.getElementById("player"));
  playerPosition++;
  if (playerPosition == maxPlayerPosition) {
    iterationStopped = true;
    clearInterval(walk);
    loopCount++;
    console.log("loopCount: ", loopCount);
  }
  if (playerPosition == maxPlayerPosition) {
    playerPosition = 0;
  }
  document
    .querySelector(`.road${playerPosition}`)
    .appendChild(document.createElement("div"))
    .setAttribute("id", "player");
  }
};
onkeydown = (event) => {
  if(event.code == "Space"){
    switch (iterationStopped) {
      case false:
        console.log("Stopped");
        clearInterval(walk);
        iterationStopped = true;
        break;
      case true:
        console.log("Started");
        walk = setInterval(playerMovement, 200);
        iterationStopped = false;
        break;
    }
  }
};


const buttons = document.querySelectorAll('[data-button="buttons"]');
let chosenTileBuild = "none";
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = () => {
    switch(buttons[i].dataset.choice){
      case "forest":
        console.log("forest");
        chosenTileBuild = "forest";
        break;
      case "mountain":
        console.log("mountain");
        chosenTileBuild = "mountain";
        break;
      case "town":
        console.log("town");
        chosenTileBuild = "town";
        break;
      case "cancel":
        console.log("cancel");
        chosenTileBuild = "none";
        break;
    }
  }
  
}


const appendTileBuild = function (index, tileBuild, src) {
  document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).appendChild(document.createElement("img"));
  document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).dataset.tileBuild = `${tileBuild}`;
  document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).firstChild.src = `./res/tiles/${src}`;
}

















/**
 * NOTATES THE ROADS AND APPENDS CLASS BUT DOESNT
 let rowStart = 3;
let columnStart = 5;
let roadTrail = `${rowArray[rowStart]}${columnStart}`;
for (let i = 0; i < movementArray.length; i++) {
  switch (movementArray[i]) {
    case s:
      rowStart++;
      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
      document.querySelector(`[data-tile="${roadTrail}"]`).style.backgroundColor = "red";
      x += 21;
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
    case d:
      columnStart++;
      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
      document.querySelector(`[data-tile="${roadTrail}"]`).style.backgroundColor = "red";
      x += 1;
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
    case w:
      rowStart--;
      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
      document.querySelector(`[data-tile="${roadTrail}"]`).style.backgroundColor = "red";
      x -= 21;
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
    case a:
      columnStart--;
      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
      document.querySelector(`[data-tile="${roadTrail}"]`).style.backgroundColor = "red";
      x -= 1;
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
  }
}
 */

/**
let x = 11;
for (let i = 0; i < movementArray.length; i++) {
  switch (movementArray[i]) {
    case s:
      x += 10;
      mainBorder.children[x].setAttribute("class", `road${i}`);
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
    case d:
      x += 1;
      mainBorder.children[x].setAttribute("class", `road${i}`);
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
    case w:
      x -= 10;
      mainBorder.children[x].setAttribute("class", `road${i}`);
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
    case a:
      x -= 1;
      mainBorder.children[x].setAttribute("class", `road${i}`);
      document.getElementById(`tile${x}`).style.backgroundColor = "red";
      break;
  }
}
 */