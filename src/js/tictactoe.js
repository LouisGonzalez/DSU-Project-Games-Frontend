const IMAGE_X = "../images/markx.png";
const IMAGE_O = "../images/neoncircle.jpg";
const IMAGE_X_ID = 1;
const IMAGE_O_ID = 2;
var countClicks = 0;
var playerX = { id: 0, username: "Pedro", typePlayer: "HUMAN", age: 12 };
var playerO = { id: 1, username: "Jose", typePlayer: "BOT", age: 33 };
var idGame = 0;
var squares = [];
var gameOver = false;

function createGame() {
  var game = {
    idGame: idGame,
    playerX: playerX.id,
    playerO: playerO.id,
  };
  var gameJSON = JSON.stringify(game);
  sendPetition(
    gameJSON,
    "http://localhost:8080/api/v1/game/tictactoe/",
    "POST"
  );
}

function putCoinHuman(squareAux, player, otherPlayer, image) {
  putImage(squareAux.id, image);
  console.log(squareAux.x, squareAux.y, squareAux.img, player.id);
  sendMove(squareAux.x, squareAux.y, squareAux.img, player.id);
  document.getElementById("playerTurn").innerHTML = otherPlayer.username;
}

function putCoinBot(player, otherPlayer, typeCoin, image) {
  var coin = Math.floor(Math.random() * 9);
  if (squares[coin].img === "none") {
    putImage(squares[coin].id, image);
    squares[coin].img = typeCoin;
    sendMove(squares[coin].x, squares[coin].y, squares[coin].img, player.id);
    document.getElementById("playerTurn").innerHTML = otherPlayer.username;
  } else {
    putCoinBot(player, otherPlayer, typeCoin, image);
  }
}

function updateCountMoves() {
  var dataMove = {
    countMoves: countClicks,
    game: idGame,
    idPlayerX: playerX.id,
    idPlayerO: playerO.id,
  };
  var dataMoveJSON = JSON.stringify(dataMove);
  sendPetition(
    dataMoveJSON,
    "http://localhost:8080/api/v1/game/tictactoe/count-moves/",
    "POST"
  );
}

function initialValues() {
  var contSquares = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      squares[contSquares - 1] = {
        square: document.getElementById("square0" + contSquares),
        img: "none",
        id: "square0" + contSquares,
        save: false,
        x: i,
        y: j,
      };
      contSquares++;
    }
  }
}

function putImage(idDiv, image) {
  document.getElementById(idDiv).style.backgroundImage = "url('" + image + "')";
  document.getElementById(idDiv).style.backgroundSize = "cover";
}

function sendMove(x, y, coin, player) {
  var data = {
    idGame: idGame,
    posX: x,
    posY: y,
    coin: coin,
    player: player,
    idPlayerX: playerX.id,
    idPlayerO: playerO.id,
  };
  if (coin == "o") data.player = playerO.id;
  else if (coin == "x") data.player = playerX.id;
  var dataJSON = JSON.stringify(data);
  var url = "http://localhost:8080/api/v1/tictactoe/move/";
  sendPetition(dataJSON, url, "POST");
}

function saveGame() {
  var game = {
    playerX: 1,
    playerO: 2,
    winner: -1,
    moves: [],
  };
  var moves = [];
  for (let i = 0; i < squares.length; i++) {
    var squareAux = squares[i];
    if (!squareAux.save) {
      squareSave = {};
      if (squareAux.img == "x" || squareAux.img == "o") {
        squareSave = {
          idGame: idGame,
          posX: squareAux.x,
          posY: squareAux.y,
          coin: squareAux.img,
          player: playerO.id,
        };
      } else {
        squareSave = {
          idGame: idGame,
          posX: squareAux.x,
          posY: squareAux.y,
          coin: "none",
          player: -1,
        };
      }
      moves.push(squareSave);
    }
  }
  var gameJSON = JSON.stringify(game);
  var url = "http://localhost:8080/api/v1/tictactoe/save";
  sendPetition(gameJSON, url, "POST");
}

function sendPetition(dataJSON, url, typePetition) {
  var movementReq = new XMLHttpRequest();
  movementReq.open(typePetition, url, true);
  movementReq.setRequestHeader("Content-Type", "application/json");
  movementReq.onreadystatechange = function () {
    if (movementReq.readyState === 4 && movementReq.status === 200) {
      //var json = JSON.parse(movementReq.responseText);
    }
    if (movementReq.response === "The game is over") gameOver = true;
    alert(movementReq.response);
  };
  movementReq.send(dataJSON);
}

function loadGame() {
  loadGameData();
  loadBoard();
}

function loadGameData() {
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/api/v1/game/tictactoe/data/" + idGame);
  req.send();
  req.onload = () => {
    console.log(req.response);
    var resJSON = JSON.parse(req.response);
    console.log(resJSON.playerX);
    console.log(resJSON.playerO);
    playerX = resJSON.playerX;
    playerO = resJSON.playerO;
    countClicks = resJSON.countMoves;
  };
}

function loadBoard() {
  let req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/api/v1/game/tictactoe/" + idGame);
  req.send();
  req.onload = () => {
    var resJSON = JSON.parse(req.response);
    for (let i = 0; i < squares.length; i++) {
      var numberSquare = i + 1;
      var idSquare = "square0" + numberSquare;
      if (resJSON[i].coin === "X") {
        putImage(idSquare, IMAGE_X);
      } else if (resJSON[i].coin === "O") {
        putImage(idSquare, IMAGE_O);
      }
    }
  };
  //falta recibir la informacion del juego(total de intentos, jugadores, etc)
}

createGame();
document.getElementById("playerTurn").innerHTML = playerX.username;
initialValues();
for (let i = 0; i < squares.length; i++) {
  squares[i].square.addEventListener("click", () => {
    if (!gameOver) {
      var squareAux = squares[i];
      if (squareAux.img == "none") {
        if (countClicks % 2 == 0) {
          if (playerX.typePlayer === "HUMAN") {
            squares[i].img = "x";
            squareAux.img = "x";
            putCoinHuman(squareAux, playerX, playerO, IMAGE_X); //metodo de comportamiento para humano
          } else if (playerX.typePlayer === "BOT") {
            putCoinBot(playerX, playerO, "x", IMAGE_X); //metodo de comportamiento para bot
          }
        } else {
          if (playerO.typePlayer === "HUMAN") {
            squares[i].img = "o";
            squareAux.img = "o";
            putCoinHuman(squareAux, playerO, playerX, IMAGE_O); //metodo de comportamiento para humano
          } else if (playerO.typePlayer === "BOT") {
            putCoinBot(playerO, playerX, "o", IMAGE_O); //metodo de comportamiento para el bot
          }
        }
        countClicks++;
        updateCountMoves();
        document.getElementById("countMoves").innerHTML = countClicks;
      }
    }
  });
}
