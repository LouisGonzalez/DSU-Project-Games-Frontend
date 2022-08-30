
var countClicks = 0;

var squares = [];
  (squares[1] = {
    square: document.getElementById("box"),
    img: false,
    id: "box",
  });


function putImage(idDiv, image) {
  if (image == 1)
    document.getElementById(idDiv).style.backgroundImage =
      "url('" + IMAGE_X + "')";
  else if (image == 2)
    document.getElementById(idDiv).style.backgroundImage =
      "url('" + IMAGE_O + "')";
  document.getElementById(idDiv).style.backgroundSize = "cover";
}
