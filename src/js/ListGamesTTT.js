const API = "http://localhost:8080/api/v1";
const FRONT = "http://localhost:5050/src/html";
var games = [];
var $ = jQuery;
var playerX = {};
var playerO = {};
var countMoves = 0;

function getGameList() {
  let req = new XMLHttpRequest();
  req.open("GET", API + "/game/tictactoe/games-tictactoe");
  req.send();
  let data = "";
  req.onload = () => {
    var resJSON = JSON.parse(req.response);
    console.log(resJSON);
    games = resJSON;
    console.log(resJSON);
    resJSON.forEach((game) => {
      data += `<tr playerId = ${game.idGame}>
      <td align="center">${game.idGame}</td>
      <td align="center">${game.playerX.userName}</td>
        <td align="center">${game.playerO.userName}</td>
        <td align="center">${game.countMoves}</td>
        <td align="center">
                <button
                    class="btn"
                    type="button"
                    id="btnGame${game.idGame}"
                    onclick="loadGame(${game.idGame})"
                >
                Go!
                </button>
        </td>
        </tr>`;
    });
    $("#bodyGames").html(data);
  };
}

function loadGame(idGame) {
  loadGameData(idGame);
  window.location.href = FRONT + "/tictactoe.html";
}

function loadGameData(idGame) {
  var actualGame = games[idGame];
  localStorage.setItem("playerX", JSON.stringify(actualGame.playerX));
  localStorage.setItem("playerO", JSON.stringify(actualGame.playerO));
  var infoGame = {
    idGame: actualGame.idGame,
    countMoves: actualGame.countMoves,
  };
  localStorage.setItem("gameTTT", JSON.stringify(infoGame));
}

getGameList();
