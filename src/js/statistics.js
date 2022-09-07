var $ = jQuery;

const liststats = () => {
  $("#hidden").hide();
  $("#showAll").on("click", () => {
    $.ajax({
      url: "http://localhost:8080/StatisticList",
      type: "GET",
      datatype: "json",
      success: (res) => {
        $("#hidden1").hide();
        $("#hidden").show();
        let data = "";
        res.forEach((element) => {
          data += `<tr playerId = ${element.name}>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.game}</td>
        <td>${element.type}</td>
        </tr>`;
        });
        $("#tbody").html(data);
      },
    });
  });
};

const listStatsHG = () => {
  $("#hidden").hide();
  $("#showHG").on("click", () => {
    $.ajax({
      url: "http://localhost:8080/StatisticsByGame/hangmanGame",
      type: "GET",
      datatype: "json",
      success: (res) => {
        $("#hidden1").hide();
        $("#hidden").show();
        let data = "";
        res.forEach((element) => {
          data += `<tr playerId = ${element.id}>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.game}</td>
        <td>${element.type}</td>
        </tr>`;
        });
        $("#tbody").html(data);
      },
    });
  });
};

const listStatsTTT = () => {
  $("#hidden").hide();
  $("#showTTT").on("click", () => {
    $.ajax({
      url: "http://localhost:8080/StatisticsByGame/tictactoeGame",
      type: "GET",
      datatype: "json",
      success: (res) => {
        $("#hidden1").hide();
        $("#hidden").show();
        let data = "";
        res.forEach((element) => {
          data += `<tr playerId = ${element.id}>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.game}</td>
        <td>${element.type}</td>
        </tr>`;
        });
        $("#tbody").html(data);
      },
    });
  });
};

liststats();
listStatsTTT();
listStatsHG();

/* <td><a id= "edit1" href="#" class="btn btn2"><strong>Edit</strong></a></td>
<td><a id="delete" href="#" class="btn btn2"><strong>Delete</strong></a></td>*/
