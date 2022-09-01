
  /*
    GUESSING PLAYER
  */
var keyRead = " ";
var enterValue = " ";
var mode = 2;

function start(){
    
}

function input(key) {  
    if (mode == 2){
        keyRead = document.getElementById(key).innerText; 
        document.getElementById("guessingLetter").innerHTML = keyRead;        
    } 

  }
  
  function space() {
    if (mode == 2){
        keyRead = " ";   
        document.getElementById("guessingLetter").innerHTML = keyRead;
    }
  }

  function del() {
    if (mode == 2){
        enterValue = enterValue.value.substr(0, enterValue.value.length - 1);
        document.getElementById("guessedLetters").innerHTML = enterValue;
    }
  }

  function ent() {
    if (mode == 1){
        
    }
    if (mode == 2){
        enterValue = enterValue + keyRead;
        document.getElementById("guessedLetters").innerHTML = enterValue;
    }

  }
  

