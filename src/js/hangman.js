
var countClicks = 0;
var attemptsLeft = 8;

function click() {
  countClicks += 1;
  document.getElementById("countMoves").innerHTML = countClicks;
  putImage(countClicks);
};


function putImage(attemptsLeft) {
  switch(attemptsLeft){
    case 1:
      document.getElementById(frameattempts).style.backgroundImage = "../images/hangman/HmFrame8.png";
    break;
    case 2:
    
    break;
    case 3:
    
    break;
    case 4:
    
    break;
    case 5:
    
    break;
    case 6:
    
    break;
    case 7:
    
    break;
    case 8:
    
    break;
  }
}
