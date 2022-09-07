var $ = jQuery;
const API = "http://localhost:8080/api/v1";

const listplayers = () => {
  $(document).ready(() => {
    $.ajax({
      url: API + "/player/all/",
      type: "GET",
      datatype: "json",
      success: (res) => {
        let data = "";
        res.forEach((element) => {
          console.log(element);
          data += `<tr playerId = ${element.id}>
        <td>${element.id}</td>
        <td>${element.userName}</td>
        <td>${element.age}</td>
        <td>${element.typePlayer}</td>
        <td><a id= "edit1" href="#" class="btn btn2"><strong>Edit</strong></a></td>
        <td><a id="delete" href="#" class="btn btn2"><strong>Delete</strong></a></td>
        </tr>`;
        });
        $("#tbody").html(data);
      },
    });
  });
};

/*const addPlayer = () => {
  $("#add").on("click", function () {
    const playerData = {
      age: $("#Age").val(),
      name: $("#Name").val(),
      id: $("#Id").val(),
      type: $("#Type").val(),
    };

    $.ajax({
      url: "http://localhost:8080/api/v1/",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(playerData),
      datatype: "JSON",
      success: (data) => {
        reset();
        console.log("Player Added");
      },
    });
  });
};*/

const editPlayer = () => {
  $("#edit").on("click", function () {
    let id = $("#Id").val();
    $("#edit").css("display", "block");

    const playerData = {
      id: $("#Id").val(),
      username: $("#Name").val(),
      age: $("#Age").val(),
      typePlayer: $("#Type").val(),
    };

    $.ajax({
      url: API + "/player/updatePlayer",
      contentType: "application/json",
      type: "PUT",
      data: JSON.stringify(playerData),
      dataType: "json",
      success: (res) => {
        $("#hidden").hide();
        reset();
        listplayers();
      },
    });
  });
};

const deletePlayer = () => {
  $(document).on("click", "#delete", function () {
    if (confirm("Are you sure?")) {
      let deleteButton = $(this)[0].parentElement.parentElement;
      let id = $(deleteButton).attr("playerId");

      $.ajax({
        url: API + "/player/delete/" + id,
        type: "DELETE",
        dataType: "json",
        success: (res) => {
          listplayers();
        },
      });
    }
  });
};

const fillPlayerData = () => {
  $("#hidden").hide();
  $(document).on("click", "#edit1", function () {
    let editButton = $(this)[0].parentElement.parentElement;
    let id = $(editButton).attr("playerId");
    $("#edit1").show();

    $.ajax({
      url: API + "/player/getPlayerById/" + id,
      type: "GET",
      dataType: "json",
      success: (res) => {
        $("#hidden").show();
        $("#Id").val(res.id);
        $("#Name").val(res.name);
        $("#Age").val(res.age);
        $("#Type").val(res.type);
      },
    });
  });
};

const validation = () => {
  $(document).on("click", "#validate", function () {
    $.ajax({
      url: API + "/playerList/",
      type: "GET",
      datatype: "json",
      success: function (data) {
        $.each(data, function () {
          if (data.length < 2) {
            window.location = "./src/html/new-user.html";
          }
          if (data.length >= 2) {
            window.location = "./src/html/tictactoe.html";
          }
        });
        console.log(data);
      },
    });
  });
};

const validation2 = () => {
  $(document).on("click", "#validate2", function () {
    $.ajax({
      url: API + "/playerList/",
      type: "GET",
      datatype: "json",
      success: function (data) {
        $.each(data, function () {
          if (data.length < 2) {
            window.location = "./src/html/new-user.html";
          }
          if (data.length >= 2) {
            window.location = "./src/html/hangman.html";
          }
        });
        console.log(data);
      },
    });
  });
};

const reset = () => {
  $("#Id").val("");
  $("#Name").val("");
  $("#Age").val("");
  $("#Type").val("");
};

validation();
validation2();
listplayers();
//addPlayer();
deletePlayer();
editPlayer();
fillPlayerData();
