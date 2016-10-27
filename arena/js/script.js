var n = document.getElementById('n');
var e = document.getElementById('e');
var s = document.getElementById('s');
var w = document.getElementById('w');
var tableHolder = document.getElementById('table');
var maze, thisCell, exitCell, cells;

n.addEventListener('click', function(){
  moveNorth();
});
e.addEventListener('click', function(){
  moveEast();
});
s.addEventListener('click', function(){
  moveSouth();
});
w.addEventListener('click', function(){
  moveWest();
});

function enableNorth(wall){
wall ? n.disabled = false : n.disabled = true;
}
function enableEast(wall){
  wall ? e.disabled = false : e.disabled = true;
}
function enableSouth(wall){
  wall ? s.disabled = false : s.disabled = true;
}
function enableWest(wall){
  wall ? w.disabled = false : w.disabled = true;
}

function moveNorth(){
statusCell(thisCell, 'inactive');
thisCell = [thisCell[0]-1, thisCell[1] ];
statusCell(thisCell, 'active');
checkWalls(cells);
}


function moveEast(){
  statusCell(thisCell, 'inactive');
  thisCell = [thisCell[0], thisCell[1]+1 ];
  statusCell(thisCell, 'active');
  checkWalls(cells);
}




function moveSouth(){
  statusCell(thisCell, 'inactive');
  thisCell = [thisCell[0]+1, thisCell[1] ];
  // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.add('active');
  statusCell(thisCell, 'active');
  checkWalls(cells);
}

function moveWest(){
  statusCell(thisCell, 'inactive');
  thisCell = [thisCell[0], thisCell[1]-1 ];
  // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.add('active');
  statusCell(thisCell, 'active');
  checkWalls(cells);
}

var grid = function(x, y){
    var totalCells = x * y;
    cells = [];
    var unvisited = [];

    for(var i = 0; i < y; i++){
        cells[i] = [];
        unvisited[i] = [];
        for(var j = 0; j < x; j++){
            cells[i][j] = [0, 0, 0, 0];
            unvisited[i][j] = true;
        }
    }

    var currentCell = [ Math.floor(Math.random() * y), Math.floor(Math.random() * x) ];

    var path = [currentCell];

    unvisited[currentCell[0]][currentCell[1]] = false;

    var visited = 1;

    while(visited < totalCells){
        var possible = [
            [ currentCell[0]-1, currentCell[1], 0, 2 ],
            [ currentCell[0], currentCell[1]+1, 1, 3 ],
            [ currentCell[0]+1, currentCell[1], 2, 0 ],
            [ currentCell[0], currentCell[1]-1, 3, 1 ]
        ];
        var neighbors = [];
        for(var l = 0; l < 4; l++){
            if(possible[l][0] > -1 &&
                possible[l][0] < y &&
                possible[l][1] > -1 &&
                possible[l][1] < x &&
                unvisited[ possible[l][0] ][ possible[l][1] ]){
                    neighbors.push( possible[l] );
            }
        }

        if(neighbors.length){
            var next = neighbors[Math.floor(Math.random() * neighbors.length)];

            cells[ currentCell[0] ][ currentCell[1] ][ next[2] ] = 1;

            cells[ next[0] ][ next[1] ][ next[3] ] = 1;

            unvisited[ next[0] ][ next[1] ] = false;

            visited++;
            currentCell = [ next[0], next[1] ];
            path.push(currentCell);
        }else{
            currentCell = path.pop();
        }
    }
    // return cells;

    gridStart(cells, path);
}(10, 10);

function gridStart(cells, path){
  gridBuilder(cells);

  thisCell = statusCell(path[0], 'active');
  exitCell = statusCell(path[path.length - 1], 'finish');

  checkWalls(cells)
}

function gridBuilder(cells){
  maze = document.createElement('table');
  tableHolder.appendChild(maze);
  // console.log(tableHolder);

  for(var i = 0; i < cells.length; i++){
    maze.insertRow(i);
    for(var j = 0; j < cells[i].length; j++){
        maze.firstChild.childNodes[i].insertCell(j);
        thisCell = maze.firstChild.childNodes[i].childNodes[j];

        for(var k = 0; k < 4; k++){
          switch(k){
            case 0:
                cells[i][j][k] ?
                thisCell.classList.remove('bt') :
                thisCell.classList.add('bt');
                break;
            case 1:
                cells[i][j][k] ?
                thisCell.classList.remove('br') :
                thisCell.classList.add('br');
                break;
            case 2:
                cells[i][j][k] ?
                thisCell.classList.remove('bb') :
                thisCell.classList.add('bb');
                break;
            case 3:
                cells[i][j][k] ?
                thisCell.classList.remove('bl') :
                thisCell.classList.add('bl');
                break;
          }
        }
    }
  }
  // console.log(maze);
}

function theCell(cell){
  maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('active');
  return cell;
}

function leaveCell(cell){
  maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('exit');
  return cell;
}

function statusCell(cell, status){
    switch(status){
      case 'active':
          maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('active');
          break;
      case 'inactive':
          maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.remove('active');
          break;
      case 'finish':
          maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('exit');
          break;
    }
      return cell;
}


function checkWalls(cells){
  var walls = cells[thisCell[0]][thisCell[1]];
  for(var i = 0; i < 4; i++){
    switch(i){
        case 0:
            enableNorth(walls[i]);
            break;
        case 1:
            enableEast(walls[i]);
            break;
        case 2:
            enableSouth(walls[i]);
            break;
        case 3:
            enableWest(walls[i]);
            break;

    }
  }
}
var hero = {
  name: 'Michael',
  power: 100
};

var Enemy = function(name, power, pos){
  this.name = name,
  this.power = power
  this.y = pos[0],
  this.x = pos[1],
  this.test = function(){
      return msg;
  }
};

function randPow(min, max){
  var pow = Math.floor(Math.random() * 100) + 1;
  // var range = Math.floor(Math.random() * (max - min)) + min;
  return pow;
}

function randCell(){
    var y = Math.floor(Math.random() * cells.length);
    var x = Math.floor(Math.random() * cells[0].length);
    return [y, x];
}


var enemy1 = new Enemy('Gage', randPow(), randCell());
var enemy2 = new Enemy('chrisWhoLikesToParty', randPow(), randCell());

// console.log(hero);
// console.log(enemy1);
// console.log(enemy2);



/*
if( !localStorage.getItem('username') && !localStorage.getItem('lastname')){
  var name = prompt('enter your name');
  var lname = prompt('enter your last name');
  var password = prompt('enter your password');

  setLoginStorage();
}else{
  alert('welcome back ' + localStorage.getItem('username'))
}


function setLoginStorage(){
  localStorage.setItem('username', name);
  localStorage.setItem('lastname', lname);
  sessionStorage.setItem('password', password);
}

setLoginStorage();
*//


if( !localStorage.getItem('hero')){
  setCharStorage();
}
function setCharStorage(){
  localStorage.setItem('hero', JSON.stringify(hero));
  sessionStorage.setItem('enemy1', JSON.stringify(enemy1));
  sessionStorage.setItem('enemy2', JSON.stringify(enemy2));

};

console.log(JSON.parse(localStorage.getItem('hero')) );
