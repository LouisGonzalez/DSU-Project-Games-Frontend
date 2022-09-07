const API = "http://localhost:8080/api/v1";

var playerGiver = JSON.parse(localStorage.getItem("playerGiver"));
var playerGuesser = JSON.parse(localStorage.getItem("playerGuesser"));
var gameInfo = JSON.parse(localStorage.getItem("gameHM"));
var idGame = 0;
var gameOver = false;

    /*
    mode = 1; Enter secret word
    mode = 2; Guess secret word
    mode = 3; Enter to play again
    */
var attemptsLeft = 8;
var countClicks = 0;
var guessingWord = "";

function initialValues() {
  idGame = gameInfo.idGame;
  countClicks = gameInfo.countMoves;
  sWord = "";
  countClicks = 0;
  attemptsLeft = 8;
  keyRead = "";
  gdletters = "";
  mode = 1;
  guessingWord = "";
  gameOver = false;
}

function updateCountMoves() {
  var dataMove = {
    countMoves: countClicks,
    game: idGame,
    idPlayerGiver: PlayerGiver.id,
    idPlayerGuesser: PlayerGuesser.id,
  };
  var dataMoveJSON = JSON.stringify(dataMove);
  sendPetition(dataMoveJSON, API + "/game/hangman/count-moves/", "POST");
}

function sendGuess(secretword, guessedLETTER, playergiver, playerguesser) {
  var data = {
    idGame: idGame,
    secretWORD: secretword,
    guessedLETTERs: guessedLETTER,
    idPlayerGiver: PlayerGiver.id,
    idPlayerGuesser: PlayerGuesser.id,
  };

  var dataJSON = JSON.stringify(data);
  var url = API + "/hangman/guess/";
  sendPetition(dataJSON, url, "POST");
}

function sendPetition(dataJSON, url, typePetition) {
  var movementReq = new XMLHttpRequest();
  movementReq.open(typePetition, url, true);
  movementReq.setRequestHeader("Content-Type", "application/json");
  movementReq.onreadystatechange = function () {
    if (movementReq.readyState === 4 && movementReq.status === 200) {
      //var json = JSON.parse(movementReq.responseText);
    }
    if (movementReq.response === "The game is over") gameOver = true;
    alert(movementReq.response);
  };
  movementReq.send(dataJSON);
}


function loadBoard() {
  let req = new XMLHttpRequest();
  req.open("GET", API + "/game/hangman/" + idGame);
  req.send();
  req.onload = () => {
    var resJSON = JSON.parse(req.response);
    
  };
}

function startgame(){
  initialValues();
  document.getElementById("player").innerHTML = "Player 1"; 
  document.getElementById("frameAttempts").src = "../images/hangman/HmFrame"+attemptsLeft+".png"; 
  document.getElementById("attempts").innerHTML = attemptsLeft; 
  document.getElementById("guessedLetters").innerHTML = gdletters;
  document.getElementById("secretWord").innerHTML = sWord;
  document.getElementById("guessingLetter").innerHTML = keyRead; 
  document.getElementById("countMoves").innerHTML = countClicks; 
}

function startguessing(){
  mode = 2;
  setSecretWord();
  document.getElementById("player").innerHTML = "Player 2"; 
}


function setSecretWordBot(){  
  if (!checkRepetition()){
  guessClick();
  var secretWords = ["secreto","palabra","perro","apendice","amor","adivina","pensamiento","caricia","gato"];
  var random = Math.floor(Math.random() * (secretWords.length) );
  document.getElementById("secretWord").innerHTML = secretWords[random];
  startguessing();
  }
}

function guessLetterBot(){  
  guessClick();
  var alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  var random = Math.floor(Math.random() * 28);
  gdletters = gdletters + alphabet[random];
  document.getElementById("guessedLetters").innerHTML = gdletters; 
  checkLetter();
}

function guessLetterHuman(){ 
  if (!checkRepetition()){
  guessClick();
  gdletters = gdletters + keyRead;
  document.getElementById("guessedLetters").innerHTML = gdletters; 
  checkLetter();
  }
}

function guessClick(){
  countClicks += 1;
  document.getElementById("countMoves").innerHTML = countClicks;  
 }

function ifExists(content, contentToFind){	
  var result = result = (content.indexOf(contentToFind) > -1) ? true : false;
  return result;
}

function setAttempts(){
  if (!ifExists(sWord, keyRead)) attemptsLeft--;
  document.getElementById("attempts").innerHTML = attemptsLeft;  
  document.getElementById("frameAttempts").src = "../images/hangman/HmFrame"+attemptsLeft+".png"; 
  if (attemptsLeft == 0) endGame();
}

function checkRepetition(){
  return ifExists(gdletters, keyRead);
}

function setSecretWord(){
  sWord = document.getElementById("secretWord").innerHTML;
  
  for (var i = 0;i < sWord.length; i++){
    guessingWord += "_ ";
  }
  document.getElementById("secretWord").innerHTML = guessingWord;
   
}

function array2String(array){
  var array2String = "";
  for (var i = 0; i < array.length; i++){
    array2String += array[i];
  }
  return array2String;
}

function checkLetter(){
  setAttempts();  
  var tempguessingWord = guessingWord.split(""); 
  var tempsecretWord = sWord.split(""); 

  if (ifExists(sWord, keyRead)){
    for (var i = 0; i < sWord.length; i++){
      if (tempsecretWord[i] == keyRead) tempguessingWord[i*2] = keyRead;
    }
    guessingWord = array2String(tempguessingWord);
    document.getElementById("secretWord").innerHTML = guessingWord;
    checkWin();
  }
}

function checkWin(){
  var temp = array2String(guessingWord.split(" "));

  if (temp == sWord){
    document.getElementById("frameAttempts").src = "../images/hangman/HmFrameWin.png";
    endGame();
  }
 /* document.getElementById("secretWord").innerHTML = array2String(temp);*/

}

function endGame(){
  document.getElementById("guessedLetters").innerHTML = "Press Enter to play again"; 
  gameOver = true;
}


  /* -------------------------------------------------- */  
initialValues();

document.getElementById("playerTurn").innerHTML = playerGiver.userName;