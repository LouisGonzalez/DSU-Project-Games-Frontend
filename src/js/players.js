var playerList = [
  {
    name: "Boot",
    age: "1",
  },
];
/*function addPlayer() {
  var namePlayer = document.getElementById("Name").value;
  var agePlayer = document.getElementById("Age").value;
  var newPlayer = {
    name: namePlayer,
    age: agePlayer,
  };

  playerList.push(newPlayer);
  document.forms[0].reset();
  console.log(playerList);
  localStorage.setItem('MyplayerList', JSON.stringify(playerList));
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('add').addEventListener('click', addPlayer);
});*/

function addPlayer() {
  var namePlayer = document.getElementById("Name").value;
  var agePlayer = document.getElementById("Age").value;

  var newPlayer = {
    name: namePlayer,
    age: agePlayer,
  };

  playerList.push(newPlayer);
  document.forms[0].reset();
  localStorage.setItem("MyplayerList", JSON.stringify(playerList));

  console.log(playerList);
}

function validate() {
  playerList = JSON.parse(localStorage.getItem("MyplayerList"));
  if (playerList.length >= 2) {
    window.location = "./src/html/tictactoe.html";
  } else {
    window.location = "./src/html/new-user.html";
  }
}
