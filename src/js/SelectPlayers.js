const API = "http://localhost:8080/api/v1";
const FRONT = "http://localhost:5050/src/html";
var $ = jQuery;
var players = [];
var playerX = { id: -1 };
var playerO = { id: -1 };

function getPlayerList() {
  let req = new XMLHttpRequest();
  req.open("GET", API + "/player/all/");
  req.send();
  let data = "";
  req.onload = () => {
    var resJSON = JSON.parse(req.response);
    players = resJSON;
    resJSON.forEach((player) => {
      data += `<tr playerId = ${player.id}>
        <td align="center">${player.id}</td>
        <td align="center">${player.userName}</td>
        <td align="center">${player.typePlayer}</td>
        <td align="center">${player.age}</td>
        <td align="center">
            <div class="dropdown">
                <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="btnChoose${player.id}"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                No choose
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a class="dropdown-item" onclick="chooseTypePlayer(1, ${player.id})"
                        >Coin X</a
                    >
                    </li>
                    <li>
                        <a class="dropdown-item" onclick="chooseTypePlayer(2, ${player.id})"
                    >Coin O</a
                    >
                    </li>
                    <li>
                        <a class="dropdown-item" onclick="chooseTypePlayer(3,${player.id})"
                    >No choose</a
                    >
                    </li>
                </ul>
            </div>
        </td>
        </tr>`;
    });
    $("#bodyPlayers").html(data);
  };
}

function chooseTypePlayer(option, idPlayer) {
  var idBtn = "btnChoose" + idPlayer;
  console.log(option);
  if (option === 1) {
    document.getElementById(idBtn).innerHTML = "Coin X";
    selectCoin("playerX", idPlayer, "X");
  } else if (option === 2) {
    document.getElementById(idBtn).innerHTML = "Coin O";
    selectCoin("playerO", idPlayer, "O");
  } else if (option === 3) {
    document.getElementById(idBtn).innerHTML = "No choose";
  }
}

function selectCoin(idTypePlayer, idPlayer, typeCoin) {
  var idBtn = "btnChoose" + idPlayer;
  var playerSelected = document.getElementById(idTypePlayer);
  if (playerSelected.value === undefined) {
    playerSelected.value = 1;
    var playerChoose = findPlayer(idPlayer);
    playerSelected.innerHTML = playerChoose.userName;
    if (typeCoin === "X") playerX = playerChoose;
    else if (typeCoin === "O") playerO = playerChoose;
  } else {
    alert("A player has already been chosen for this token");
    document.getElementById(idBtn).innerHTML = "No choose";
  }
}

function findPlayer(idPlayer) {
  var playerReturn = {};
  players.forEach((player) => {
    if (player.id == idPlayer) {
      playerReturn = player;
    }
  });
  return playerReturn;
}

function getIdGame() {
  var req = new XMLHttpRequest();
  req.open("GET", API + "/game/tictactoe/id");
  req.send();
  req.onload = () => {
    var responseJSON = JSON.parse(req.response);
    var idGame = responseJSON.id;
    var infoGame = { idGame: idGame, countMoves: 0 };
    localStorage.setItem("gameTTT", JSON.stringify(infoGame));
  };
}

function createGame() {
  var game = {
    playerX: playerX.id,
    playerO: playerO.id,
  };
  var gameJSON = JSON.stringify(game);
  var req = new XMLHttpRequest();
  req.open("POST", API + "/game/tictactoe/", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
    alert(req.response);
    getIdGame();
  };
  req.send(gameJSON);
}

function goGame() {
  if (playerX.id == -1 || playerO.id == -1) {
    alert("No players have been chosen yet");
  } else {
    localStorage.setItem("playerX", JSON.stringify(playerX));
    localStorage.setItem("playerO", JSON.stringify(playerO));
    createGame();
    window.location.href = FRONT + "/tictactoe.html";
  }
}

function loadGame() {
  window.location.href = FRONT + "/list-games-tictactoe.html";
}

getPlayerList();
