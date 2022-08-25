const IMAGE_X = "../images/markx.png";
const IMAGE_O = "../images/neoncircle.jpg";
const IMAGE_X_ID = 1;
const IMAGE_O_ID = 2;
var countClicks = 0;

var squares = [];
(squares[0] = {
  square: document.getElementById("square01"),
  img: false,
  id: "square01",
}),
  (squares[1] = {
    square: document.getElementById("square02"),
    img: false,
    id: "square02",
  }),
  (squares[2] = {
    square: document.getElementById("square03"),
    img: false,
    id: "square03",
  }),
  (squares[3] = {
    square: document.getElementById("square04"),
    img: false,
    id: "square04",
  }),
  (squares[4] = {
    square: document.getElementById("square05"),
    img: false,
    id: "square05",
  }),
  (squares[5] = {
    square: document.getElementById("square06"),
    img: false,
    id: "square06",
  }),
  (squares[6] = {
    square: document.getElementById("square07"),
    img: false,
    id: "square07",
  }),
  (squares[7] = {
    square: document.getElementById("square08"),
    img: false,
    id: "square08",
  }),
  (squares[8] = {
    square: document.getElementById("square09"),
    img: false,
    id: "square09",
  });

for (let i = 0; i < squares.length; i++) {
  squares[i].square.addEventListener("click", () => {
    if (!squares[i].img) {
      squares[i].img = true;
      if (countClicks % 2 == 0) putImage(squares[i].id, IMAGE_X_ID);
      else putImage(squares[i].id, IMAGE_O_ID);
      countClicks++;
      document.getElementById("countMoves").innerHTML = countClicks;
    }
  });
}

function putImage(idDiv, image) {
  if (image == 1)
    document.getElementById(idDiv).style.backgroundImage =
      "url('" + IMAGE_X + "')";
  else if (image == 2)
    document.getElementById(idDiv).style.backgroundImage =
      "url('" + IMAGE_O + "')";
  document.getElementById(idDiv).style.backgroundSize = "cover";
}
