const API = "http://localhost:8080/api/v1";

var playerGiver = JSON.parse(localStorage.getItem("playerGiver"));
var playerGuesser = JSON.parse(localStorage.getItem("playerGuesser"));
var gameInfo = JSON.parse(localStorage.getItem("gameHM"));
var idGame = 0;
var gameOver = false;

var keyRead = "";
var gdletters = "";
var mode = 1;
    /*
    mode = 1; Enter secret word
    mode = 2; Guess secret word
    mode = 3; Enter to play again
    */
var attemptsLeft = 8;
var sWord = "";    
var countClicks = 0;

function initialValues() {
  sWord = "";
  countClicks = 0;
  attemptsLeft = 8;
  keyRead = "";
  gdletters = "";
  mode = 1;
}

function startguessing(){
  mode = 2;
  setSecretWord();
}

function input(key) {  
  if (mode == 1){
    sWord = sWord+document.getElementById(key).innerHTML; 
    document.getElementById("secretWord").innerHTML = sWord;        
  } 
  if (mode == 2){
      keyRead = document.getElementById(key).innerText; 
      document.getElementById("guessingLetter").innerHTML = keyRead;        
  }     
}

function del() {
  if (mode == 1){
    sWord = sWord.slice(0, -1);
    document.getElementById("secretWord").innerHTML = sWord;
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
}

function ifExists(content, contentToFind){	
  var result = result = (content.indexOf(contentToFind) > -1) ? true : false;
  if (!result) attemptsLeft--;
  document.getElementById("attempts").innerHTML = attemptsLeft;
}

function guessLetterBot(){  
  guessClick();
  var alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  var random = Math.floor(Math.random() * 28);
  gdletters = gdletters + alphabet[random];
  document.getElementById("guessedLetters").innerHTML = gdletters; 
  putImage();
}

function setSecretWordBot(){  
  guessClick();
  var secretWords = ["secreto","palabra","perro","apendice","amor","adivina","pensamiento","caricia","gato"];
  var random = Math.floor(Math.random() * (secretWords.length+1) );
  sWord = secretWords[random];
  putImage();
}

function guessLetterHuman(){ 
  guessClick();
  gdletters = gdletters + keyRead;
  document.getElementById("guessedLetters").innerHTML = gdletters; 
  putImage();
}


function guessClick(){
  countClicks += 1;
  document.getElementById("countMoves").innerHTML = countClicks;  
 }

function putImage(){ 
  ifExists(sWord, keyRead);  
  document.getElementById("frameAttempts").src = "../images/hangman/HmFrame"+attemptsLeft+".png"; 

}

function setSecretWord(){
  document.getElementById("secretWord").innerHTML = sWord; 
   
}

function checkWin(){

}



    