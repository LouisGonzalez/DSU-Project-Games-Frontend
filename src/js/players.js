var bttn = document.getElementById("add");
if (bttn) {
  bttn.addEventListener("click", addPlayer);
}

function addPlayer(e) {
  name = document.getElementById("Name").value;
  age = document.getElementById("Age").value;

  let newPlayer = {
    name,
    age,
  };

  if (localStorage.getItem("playerList") === null) {
    let playerList = [];
    playerList.push(newPlayer);
    localStorage.setItem("playerList", JSON.stringify(playerList));
  } else {
    let playerList = JSON.parse(localStorage.getItem("playerList"));
    playerList.push(newPlayer);
    localStorage.setItem("playerList", JSON.stringify(playerList));
  }
  read();
  document.getElementById("form1").reset();
  console.log("Usuario agregado");
  e.preventDefault();
}

function read() {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  document.getElementById("tbody").innerHTML = " "; //Having issues with read!
  for (let i = 0; i < playerList.length; i++) {
    let name = playerList[i].name;
    let age = playerList[i].age;
    document.getElementById("tbody").innerHTML += `<tr>
        <td>${name}</td>
        <td>${age}</td>
        <td><a onclick ="edit('${name}')"  href="#" class="btn btn4"><strong>edit</strong></a></td>
        <td><a onclick ="deletePlayer('${name}')" href="#" class="btn btn4"><strong>delete</strong></a></td>
    </tr>`;
  }
}

function validate() {
  playerList = JSON.parse(localStorage.getItem("playerList"));
  if (playerList === null || playerList.length < 2) {
    window.location = "./src/html/new-user.html";
  } else if (playerList.length >= 2) {
    window.location = "./src/html/tictactoe.html";
  }
}

function edit(name) {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i].name === name) {
      document.getElementById(
        "body"
      ).innerHTML = `<div class="flat-form" id="tbody">
    <div id="register" class="form-action">
      <br /><br />
      <h1>EDIT REGISTER</h1>
      <br /><br />
      <form id="form1">
        <ul>
          <li>
            <input type="text" id="newName" placeholder="${playerList[i].name}" />
          </li>
          <li>
            <input type="text" id="newAge" placeholder="${playerList[i].age}" />
          </li>
          <li>
          <a onclick ="update('${i}')" href="#" class="btn btn2"><strong>update</strong></a>
          </li>
        </ul>
      </form>
    </div>
    <!--/#register.form-action-->
  </div>`;
    }
  }
}

function update(i) {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  playerList[i].name = document.getElementById("newName");
  playerList[i].age = document.getElementById("newAge");
  if (playerList[i].name == "") {
    alert("New name has not been entered");
  } else {
    if (playerList[i].age == "") {
      alert("New age has not been entered");
    }
  }
  localStorage.setItem("playerList", JSON.stringify(playerList));
  principalView();
}

function deletePlayer(name) {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i].name === name) {
      playerList.splice(i, 1);
    }
  }
  localStorage.setItem("playerList", JSON.stringify(playerList));
  read();
}

function principalView() {
  document.getElementById("body").innerHTML = `<div class="flat-form">
  <h1>PLAYER LIST</h1>
  <table class="table">
    <thead>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col" colspan="2 ">Action</th>
    </thead>
    <tbody id="tbody">
      <tr>
        <td>name</td>
        <td>age</td>
      </tr>
    </tbody>
  </table>
  <!--/#register.form-action-->
</div>`;
  read();
}

read();

/*
back up
var bttn = document.getElementById("add");
if (bttn) {
  bttn.addEventListener("click", addPlayer);
}

function addPlayer(e) {
  name = document.getElementById("Name").value;
  age = document.getElementById("Age").value;

  let newPlayer = {
    name,
    age,
  };

  if (localStorage.getItem("playerList") === null) {
    let playerList = [];
    playerList.push(newPlayer);
    localStorage.setItem("playerList", JSON.stringify(playerList));
  } else {
    let playerList = JSON.parse(localStorage.getItem("playerList"));
    playerList.push(newPlayer);
    localStorage.setItem("playerList", JSON.stringify(playerList));
  }
  read();
  document.getElementById("form1").reset();
  console.log("Usuario agregado");
  e.preventDefault();
}

function read() {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  document.getElementById("tbody").innerHTML = " ";
  for (let i = 0; i < playerList.length; i++) {
    let name = playerList[i].name;
    let age = playerList[i].age;
    document.getElementById("tbody").innerHTML += `<tr>
        <td>${name}</td>
        <td>${age}</td>
        <td><a id="add" href="#" class="btn btn4"><strong>Sign up</strong></a></td>
        <td><a id="add" href="#" class="btn btn4"><strong>Sign up</strong></a></td>
    </tr>`;
  }
}

function validate() {
  playerList = JSON.parse(localStorage.getItem("playerList"));
  if (playerList === null || playerList.length < 2) {
    window.location = "./src/html/new-user.html";
  } else if (playerList.length >= 2) {
    window.location = "./src/html/tictactoe.html";
  }
}

function edit(name) {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i].name === name) {
      document.getElementById(
        "body"
      ).innerHTML = `<div class="flat-form" id="tbody">
    <div id="register" class="form-action">
      <br /><br />
      <h1>EDIT REGISTER</h1>
      <br /><br />
      <form id="form1">
        <ul>
          <li>
            <input type="text" id="newName" placeholder="${playerList[i].name}" />
          </li>
          <li>
            <input type="text" id="newAge" placeholder="${playerList[i].age}" />
          </li>
          <li>
          <button onclick ="update('${i}')" id="eliminate" href="#" class="btn btn2"><strong>update</strong></button>
          </li>
          <li>
          <button onclick ="update(${i})" id="edit" href="#" class="btn btn2"><strong>Edit</strong></button>
          </li>
        </ul>
      </form>
    </div>
    <!--/#register.form-action-->
  </div>`;
    }
  }
}

function update(i) {
  let playerList = JSON.parse(localStorage.getItem("playerList"));
  playerList[i].name = document.getElementById("newName");
  playerList[i].age = document.getElementById("newAge");
  localStorage.setItem("playerList", JSON.stringify(playerList));
}
read();*/
