
var sWord = "";    
var gdletters = "";

var keyRead = "";
var mode = 1;
var botTurn = false;

function input(key) {  
    if (mode == 1){
      sWord = sWord+document.getElementById(key).innerHTML; 
      document.getElementById("secretWord").innerHTML = sWord;        
    } 
    if (mode == 2 && !gameOver){
        keyRead = document.getElementById(key).innerText; 
        document.getElementById("guessingLetter").innerHTML = keyRead;        
    }     
  }
  
  
  function ent() {
    if (mode == 2){
      guessLetterHuman();
  }    
    if (mode == 1){
        if (sWord != ""){
          startguessing();
        }
    } 
    if (gameOver){
        if (mode == 2) mode = 3;
        else startGame();
  }   
    if (botTurn){
      if (mode == 1) setSecretWordBot();
      if (mode == 2) guessLetterBot();
    }
  }


function del() {
    if (mode == 1){
      sWord = sWord.slice(0, -1);
      document.getElementById("secretWord").innerHTML = sWord;
    }
  }