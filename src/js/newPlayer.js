var btnPlayer = document.getElementById("btnSave");
var typePlayer = "Human";
document.getElementById("btnTypePlayer").innerHTML = "Human";

btnPlayer.addEventListener("click", () => {
  console.log("fui presionado");
  sendPlayerData();
});

function sendPlayerData() {
  var playerReq = new XMLHttpRequest();
  var url = "http://localhost:8080/api/v1/player/";
  playerReq.open("POST", url, true);
  playerReq.setRequestHeader("Content-Type", "application/json");
  playerReq.onreadystatechange = function () {
    alert(playerReq.response);
  };
  var player = {
    username: document.getElementById("username").value,
    age: document.getElementById("age").value,
    typePlayer: typePlayer,
  };
  if (player.username != "" && player.age != "") {
    var playerJSON = JSON.stringify(player);
    playerReq.send(playerJSON);
    clearFields();
  } else {
    alert("Missing fields");
  }
}

function clearFields() {
  document.getElementById("username").value = "";
  document.getElementById("age").value = "";
}

function chooseTypePlayer(option) {
  if (option === 1) {
    document.getElementById("btnTypePlayer").innerHTML = "Human";
    typePlayer = "Human";
  } else if (option === 2) {
    document.getElementById("btnTypePlayer").innerHTML = "Bot";
    typePlayer = "Bot";
  }
}
