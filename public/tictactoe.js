let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie Game", "X Wins", "O Wins" 
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six",
                 "seven", "eight", "nine"];

const idGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
                 
let playerLastClicked = "";

let playerNumber = "0"; 

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCNNbVjI2u7AEC3ivoLy17RuRUt47hF6ns",
  authDomain: "tictactoe-2cc0f.firebaseapp.com",
  databaseURL: "https://tictactoe-2cc0f.firebaseio.com",
  projectId: "tictactoe-2cc0f",
  storageBucket: "tictactoe-2cc0f.appspot.com",
  messagingSenderId: "805526955555",
  appId: "1:805526955555:web:20f6c8801d196069577396"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Player1DB = firebase.database().ref('p1'); 
const Player2DB = firebase.database().ref('p2');

const Player1GridDB = firebase.database().ref('p1Grid'); 
const Player2GridDB = firebase.database().ref('p2Grid');


window.onunload = function () {
  if (playerNumber == 1) {
    Player1DB.set({online : 0}); 
    
  } else if (playerNumber == 2) {
    Player2DB.set({online : 0}); 
  }
  playerNumber = 0; 
  console.log("User: " + playerNumber);
}

function sendMove(str) {
  
}

function setUser() {
  const status = document.getElementById("gameStatus"); 
  Player1DB.once("value", function(data) {
    const newData = data.val();
    
    if (newData.online == 0) {
      playerNumber = 1;
      Player1DB.set({online : 1}); 
      Player1GridDB.set({grid : idGrid}); 
      status.innerHTML = "Hello Player 1, we're just waiting for player 2"; 
    } else if (newData.online == 1) {
      playerNumber = 2;
      Player2DB.set({online : 1}); 
      Player2GridDB.set({grid : idGrid}); 
      status.innerHTML = "Hello Player 2, both players are here!";  
    }
    console.log("User #: " + playerNumber);
  }); 

  Player2DB.on("value", function(data) {
    const newData = data.val();
    if (newData.online == 1) {
      status.innerHTML = "Hello Player 1, both players are here!";  
    } else {
      status.innerHTML = "Hello Player 1, we're just waiting for player 2"; 
    }
  });
  Player1DB.on("value", function(data) {
    const newData = data.val();
    if (newData.online == 0) {
      status.innerHTML = "Hello Player 2, we're just waiting for player 1";  
    }
  });
} // setUser

// reset board and all variables
function newGame() {
  
  // reset board
  for (var i = 0; i < idNames.length; i++){
     document.getElementById(idNames[i]).innerHTML = "";   
  } // for
  
  numTurns = 0;
  gameStatus = "";
  currentPlayer = "X";
  
  setUser(); 
  changeVisibility("controls");
  
} // newGame


function waitForOpponent() {

}

// take player turn
function playerTakeTurn(e) {
  
  if (e.innerHTML == "") {
    e.innerHTML = currentPlayer;
    playerLastClicked = e.id;
    console.log("e id " + e.id);
    checkGameStatus(); 
    
    // if game not over, computer goes
    if (gameStatus == "") {
      setTimeout(function() {
          sendMove(e.id); 
          
          waitForOpponent();
          checkGameStatus(); 
        }, 500
      );
    } // if
    
    
  } else {
    showLightBox("This box is already selected.", "Please try another.");
    return;
  } // else

   
    
} // playerTakeTurn


// after each turn, check for a winner, a tie,
// or continue playing
function checkGameStatus(){
  numTurns++;  // count turn
  
  // check for a win
  if (checkWin()) {
    gameStatus = currentPlayer + " wins!";
    return;
  }
  
  
  // check for tie
  if (numTurns == 9) {
     gameStatus = "Tie Game";
   
  } // if
  
  // switch current player
  currentPlayer = (currentPlayer == "X" ? "O" : "X" );
  
  // game is over  
  if (gameStatus != "") {
    setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
  }
  
} // checkGameStatus

// check for a Win, there 8 win paths
function checkWin() {
  let cb = []; // current board
  cb[0] = ""; // not goint to use
  cb[1] = document.getElementById("one").innerHTML;
  cb[2] = document.getElementById("two").innerHTML;
  cb[3] = document.getElementById("three").innerHTML;
  cb[4] = document.getElementById("four").innerHTML;
  cb[5] = document.getElementById("five").innerHTML;
  cb[6] = document.getElementById("six").innerHTML;
  cb[7] = document.getElementById("seven").innerHTML;
  cb[8] = document.getElementById("eight").innerHTML;
  cb[9] = document.getElementById("nine").innerHTML;
  
  console.log("first row: " + cb[1] + " " + cb[2] + " " + cb[3] + " ");
  
  // top row
  if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
    console.log("returning true");
    return true;
  }
  
} // checkWin

// change the visibility of ID
function changeVisibility(divID) {
  var element = document.getElementById(divID);
 
  // if element exists, it is considered true
  if (element) {
	  element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
  } // if 
} // changeVisibility

// display message in lightbox
function showLightBox(message, message2) {
  
  // set messages
  document.getElementById("message").innerHTML = message;
  document.getElementById("message2").innerHTML = message2;
  
  // show lightbox 
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
  
} // showLightBox

// close light box
function continueGame() {
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
  
  // if the game is over, show controls
  if (gameStatus != "") {
    changeVisibility("controls");
  }
} // continueGame









