const randomize = () => Math.floor(Math.random() * 5);
const classes = ['sky', 'tree', 'leaf', 'ground', 'stone', 'gress'];
const board = document.querySelector('.board');
var currentTool = undefined;
let inventory = document.querySelector('#inventoryID');
const btnStart = document.querySelector('button');
const homepage = document.querySelector('.homepage');

const objectToToolMap = {
  tree: 'axe',
  leaf: 'axe',
  ground: 'shovel',
  gress: 'shovel',
  stone: 'pickaxe',
};
const tree = [
  { x: 19, y: 19 },
  { x: 18, y: 19 },
  { x: 17, y: 19 },
  { x: 16, y: 19 },
];
const leaf = [
  { x: 15, y: 18 },
  { x: 15, y: 19 },
  { x: 15, y: 20 },
  { x: 14, y: 18 },
  { x: 14, y: 19 },
  { x: 14, y: 20 },
  { x: 13, y: 18 },
  { x: 13, y: 19 },
  { x: 13, y: 20 },
];
const stone = [
  { x: 19, y: 5 },
  { x: 19, y: 6 },
  { x: 18, y: 6 },
];

function setGrid() {
  for (let i = 1; i <= 25; i++) {
    for (let j = 1; j <= 25; j++) {
      if (i > 21) newElement(classes[3], j, i);
      else if (21 == i) newElement(classes[5], j, i);
      else newElement(classes[0], j, i);
    }
  }
}

function newElement(cls, i, j) {
  const el = document.createElement('div');
  el.addEventListener('click', clickPosition);
  el.classList.add(`${cls}`);
  el.style.gridColumnStart = i;
  el.style.gridRowStart = j;
  board.appendChild(el);
}

function drawElemnt(element, cls) {
  element.forEach((el) => {
    const index = el.x * 25 + el.y;
    //take x,y from grid
    //change div's class to cls
    const child = board.children[index];

    //get current lass list and remove it
    const removeClass = child.classList.value;
    // console.log(removeClass);
    child.classList.toggle(removeClass);
    child.classList.toggle(cls);
  });
}

const inventoryOperation = (object) => {
  if (inventory.className == 'inventory') {
    // change style of inventory to blick
  } else if (object.className != 'sky') {
    return;
  } else {
    object.classList.remove(object.className);
    object.classList.toggle(inventory.className);

    inventory.classList.remove(inventory.className);
    inventory.classList.toggle('inventory');
    inventory.style.backgroundColor = 'black';
    inventory.style.borderColor = 'white';
  }
  // change object style to inventory style
};

const toolOperation = (object) => {
  if (currentTool.className != objectToToolMap[object.className]) {
    console.log(object.className);
    console.log(objectToToolMap[object.className]);
    let prevBackgroundColor = currentTool.style.backgroundColor;
    let prevBorderColor = currentTool.style.borderColor;
    currentTool.style.backgroundColor = 'red';
    currentTool.style.borderColor = 'red';
    setTimeout(() => {
      currentTool.style.backgroundColor = prevBackgroundColor;
      currentTool.style.borderColor = prevBorderColor;
    }, 150);
    // change style (background color) of current tool
  } else {
    // change
    inventory.classList.remove(inventory.className);
    inventory.classList.toggle(object.className);
    object.classList.remove(object.className);
    object.classList.toggle('sky');
  }
};

const clickPosition = function (event) {
  let el = event.target;
  if (currentTool == null) return;
  else if (currentTool.id == 'inventoryID') {
    inventoryOperation(el);
  } else {
    toolOperation(el);
  }
};

const toolListenner = (event) => {
  let tool = event.target;
  // change style
  if (currentTool != undefined) {
    currentTool.style.backgroundColor = null;
    currentTool.style.borderColor = null;
    tool.style.backgroundColor = 'blue';
    tool.style.borderColor = 'blue';
  } else {
    tool.style.backgroundColor = 'blue';
    tool.style.borderColor = 'blue';
  }

  currentTool = tool;
};

document.querySelector('#pickaxeID').addEventListener('click', toolListenner);
document.querySelector('#shovelID').addEventListener('click', toolListenner);
document.querySelector('#axeID').addEventListener('click', toolListenner);
document.querySelector('#inventoryID').addEventListener('click', toolListenner);

btnStart.addEventListener('click', function () {
  homepage.classList.add('off');
});

setGrid();
drawElemnt(tree, 'tree');
drawElemnt(leaf, 'leaf');
drawElemnt(stone, 'stone');
