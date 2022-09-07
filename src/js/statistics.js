var $ = jQuery;
const API = "http://localhost:8080/api/v1";

const liststats = () => {
  $("#hidden").hide();
  $("#showAll").on("click", () => {
    $.ajax({
      url: API + "/statistics/StatisticList",
      type: "GET",
      datatype: "json",
      success: (res) => {
        $("#hidden1").hide();
        $("#hidden").show();
        let data = "";
        res.forEach((element) => {
          element.myStatistics.listStatistics.forEach((stats) => {
            data += `<tr playerId = ${element.name}>
            <td>${element.name}</td>
            <td>${stats.typeGame}</td>
            <td>${stats.value}</td>
            </tr>`;
          });
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
      url: API + "/statistics/statistics-hangman",
      type: "GET",
      datatype: "json",
      success: (res) => {
        $("#hidden1").hide();
        $("#hidden").show();
        let data = "";
        res.forEach((element) => {
          element.myStatistics.listStatistics.forEach((stats) => {
            if (stats.typeGame == "HANGMAN") {
              data += `<tr playerId = ${stats.typeGame}>
            <td>${element.name}</td>
            <td>${stats.typeGame}</td>
            <td>${stats.value}</td>
            </tr>`;
            }
          });
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
      url: API + "/statistics/statistics-tictactoe",
      type: "GET",
      datatype: "json",
      success: (res) => {
        $("#hidden1").hide();
        $("#hidden").show();
        let data = "";
        res.forEach((element) => {
          element.myStatistics.listStatistics.forEach((stats) => {
            if (stats.typeGame == "TICTACTOE") {
              data += `<tr playerId = ${stats.typeGame}>
            <td>${element.name}</td>
            <td>${stats.typeGame}</td>
            <td>${stats.value}</td>
            </tr>`;
            }
          });
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
