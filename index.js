const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/"));
app.use(
  "/scripts",
  express.static(__dirname + "/node_modules/bootstrap/dist/")
);
app.listen(5050, function () {
  console.log("Servidor iniciado en el puerto 5050");
});
