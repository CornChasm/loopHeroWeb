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
    if (mainBorder.children[index].dataset.tileType != "road" && mainBorder.children[index].dataset.tileType != "rim"){
      document.querySelector(`[data-tile="${mainBorder.children[index].dataset.tile}"]`).style.backgroundColor = "blue";
    }
  };
}

const w = "up";
const a = "left";
const s = "down";
const d = "right";
const movementArray = [d, d, d, d, s, d, d, d, s, s, a, a, s, a, a, s, a, a, w, a, w, w, w, w];

let rowStart = 3;
let columnStart = 5;
let roadTrail = `${rowArray[rowStart]}${columnStart}`;

document
  .querySelector(`[data-tile="${roadTrail}"]`)
  .appendChild(document.createElement("div"))
  .setAttribute("id", "player");

const setTileTypes = function (rowStart, columnStart){
    if (document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart-1]}${columnStart}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart+1]}${columnStart}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart-1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart-1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart-1}"]`).style.backgroundColor = "pink";
    }
    if (document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart+1}"]`).dataset.tileType != "road"){
        document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart+1}"]`).dataset.tileType = "rim";
      document.querySelector(`[data-tile="${rowArray[rowStart]}${columnStart+1}"]`).style.backgroundColor = "pink";
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

for (let i = 0; i < movementArray.length; i++) {
  document.querySelector(`[data-tile="${roadTrail}"]`).style.backgroundColor = "red";
  switch (movementArray[i]) {
    case s:
      document.querySelector(`[data-tile="${roadTrail}"]`).dataset.tileType = "road";

      setTileTypes(rowStart, columnStart);

      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);

      rowStart++;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      console.log(roadTrail);
      break;
    case d:
      document.querySelector(`[data-tile="${roadTrail}"]`).dataset.tileType = "road";

      setTileTypes(rowStart, columnStart);

      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);

      columnStart++;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      console.log(roadTrail);
      break;
    case w:
      document.querySelector(`[data-tile="${roadTrail}"]`).dataset.tileType = "road";

      setTileTypes(rowStart, columnStart); 

      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
      rowStart--;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      console.log(roadTrail);
      break;
    case a:
      document.querySelector(`[data-tile="${roadTrail}"]`).dataset.tileType = "road";

      setTileTypes(rowStart, columnStart);

      document.querySelector(`[data-tile="${roadTrail}"]`).setAttribute("class", `road${i}`);
      columnStart--;
      roadTrail = `${rowArray[rowStart]}${columnStart}`;
      console.log(roadTrail);
      break;
  }
}
let playerPosition = 0;
let loopCount = 0;
let iterationStopped = true;
let maxPlayerPosition = movementArray.length;
let child = document.getElementById("player");
let parent = document.querySelector(`.road${playerPosition}`);
const amogus = function () {
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
onclick = () => {
  switch (iterationStopped) {
    case false:
      console.log("Stopped");
      clearInterval(walk);
      iterationStopped = true;
      break;
    case true:
      console.log("Started");
      walk = setInterval(amogus, 200);
      iterationStopped = false;
      break;
  }
};


















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