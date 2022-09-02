const API = "http://localhost:8080/api/v1";
const IMAGE_X = "../images/markx.png";
const IMAGE_O = "../images/neoncircle.jpg";
const IMAGE_X_ID = 1;
const IMAGE_O_ID = 2;
var playerX = JSON.parse(localStorage.getItem("playerX"));
var playerO = JSON.parse(localStorage.getItem("playerO"));
var gameInfo = JSON.parse(localStorage.getItem("gameTTT"));
var idGame = 0;
var countClicks = 0;
var squares = [];
var gameOver = false;

function initValues() {
  idGame = gameInfo.idGame;
  countClicks = gameInfo.countMoves;
  if (countClicks > 0) {
    loadBoard();
  }
}

function putCoinHuman(squareAux, player, otherPlayer, image) {
  putImage(squareAux.id, image);
  console.log(squareAux.x, squareAux.y, squareAux.img, player.id);
  sendMove(squareAux.x, squareAux.y, squareAux.img, player.id);
  document.getElementById("playerTurn").innerHTML = otherPlayer.userName;
}

function putCoinBot(player, otherPlayer, typeCoin, image) {
  var coin = Math.floor(Math.random() * 9);
  if (squares[coin].img === "none") {
    putImage(squares[coin].id, image);
    squares[coin].img = typeCoin;
    sendMove(squares[coin].x, squares[coin].y, squares[coin].img, player.id);
    document.getElementById("playerTurn").innerHTML = otherPlayer.userName;
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
  sendPetition(dataMoveJSON, API + "/game/tictactoe/count-moves/", "POST");
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
  var url = API + "/tictactoe/move/";
  sendPetition(dataJSON, url, "POST");
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

function loadBoard() {
  let req = new XMLHttpRequest();
  req.open("GET", API + "/game/tictactoe/" + idGame);
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
}

initValues();
document.getElementById("playerTurn").innerHTML = playerX.userName;
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
