let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie Game", "X Wins", "O Wins" 
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six",
                 "seven", "eight", "nine"];


let idGrid = ["", "", "", "", "", "", "", "", ""]; // empty grid to set to default stage of game. 
                

let playerNumber = 0; // this will be player 1 or player 2, depending who opened the website first.
let playerTurn = 0;
let bothPlayers = false;

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

// players online references to the database (inside p1, and p2)
const Player1DB = firebase.database().ref('p1'); 
const Player2DB = firebase.database().ref('p2');
// players grid position (array) inside p1Grid and p2Grid
const p1Grid = firebase.database().ref('p1Grid'); 
const p2Grid = firebase.database().ref('p2Grid'); 

let grid;
let otherGrid;  

const turn = firebase.database().ref('turn'); 


// anonymous function which runs when the window is closed
window.onunload = function () {
  // if player 1 is in the browser that just close, set online to 0 in the database (0 = false)
  if (playerNumber == 1) {
    Player1DB.set({online : 0}); 
    
  } 
  // if player 2 is in the browser that just close, set online to 0 in the database (0 = false)
  else if (playerNumber == 2) {
    Player2DB.set({online : 0}); 
  }
} // onunload function

// sends new player move to appropriate DB
function sendMove(str) {
  
}

// sets up the users activity and player number
function setUser() {
  const status = document.getElementById("gameStatus"); 
  // checks ONCE to see if p1's "online" status is 0 or 1
  Player1DB.once("value", function(data) {
    const newData = data.val();
    // if p1 is 0 (offline) then make them online, set their grid to all 0 and change html status
    if (newData.online == 0) {
      playerNumber = 1;
      playerTurn = 2; 
      Player1DB.set({online : 1});
      grid = p1Grid;
      otherGrid = p2Grid;  
      currentPlayer = "X"; 
      status.innerHTML = "Hello Player 'X', we're just waiting for player 'O'";
      bothPlayers = false;  
    } 
    // if p1 is 1 (online) then it means this will be player 2 so set player 2 to be online
    // set their grid to all 0 and change html status
    else if (newData.online == 1) {
      playerNumber = 2;
      playerTurn = 1; 
      Player2DB.set({online : 1});
      grid = p2Grid; 
      otherGrid = p1Grid; 
      currentPlayer = "O"; 
      status.innerHTML = "Hello Player 'O', wait for 'X' to make a move";
      bothPlayers = true;   
    }
    grid.set(idGrid); 
    turn.set(1); 
    console.log("User #: " + playerNumber);
    updateGrid(); 
  }); 

  // Asynchronous  monitoring for changes in the "online" data. These functions will AUTOMATICALLY run on changes to the data. 
  // If a second player joins, it will change both status messages, and if a player leaves, it will change the status
  // for the remaining player
  Player2DB.on("value", function(data) {
    const newData = data.val();
    // if player 2 is online, then both are here
    if (newData.online == 1) {
      status.innerHTML = "Hello Player 'X', please make your move";
      bothPlayers = true;   
    } 
    // if not, player 1 is waiting for player 2
    else {
      status.innerHTML = "Hello Player 'X', we're just waiting for player 'O'"; 
      bothPlayers = false; 
    }
  });
  Player1DB.on("value", function(data) {
    const newData = data.val();
    // if player 1 is NOT online, then player 2 is waiting for player 1
    if (newData.online == 0) {
      status.innerHTML = "Hello Player 'O', we're just waiting for player 'X'";
      bothPlayers = false;   
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
  
  // runs all init funcitons
  setUser(); 
  //changeVisibility("controls");
} // newGame

// take player turn
function playerTakeTurn(e) {
  if (bothPlayers == true) {
    const status = document.getElementById("gameStatus"); 
    status.innerHTML = "You are " + currentPlayer; 
    turn.once("value", function(data) {
      const newData = data.val(); 
      if (newData == playerNumber) {
        if (e.innerHTML == "") {
          e.innerHTML = currentPlayer;
          //pushes data to local array
          idGrid[toNumber(e.id)-1] = currentPlayer; 
          
          // pushes data to firebase
          grid.update(idGrid);
          turn.set(playerTurn);
          console.log("e id " + e.id);
          checkGameStatus(); 
 
        } else {
          showLightBox("This box is already selected.", "Please try another.");
          return;
        } // else
      } else {
        showLightBox("It's not your turn, wait for opponent to move"); 
      } // if/else who's turn it is
    }); 
  } else {
    showLightBox("You need another player!");
  }
} // playerTakeTurn

function updateGrid() {
  let e;
  otherGrid.on("value", function(Gdata) {
    const GnewData = Gdata.val(); 
    console.log("grid once");
    for (let i = 0; i<GnewData.length; i++) {
      e = document.getElementById(toString(i)); 
      console.log("grid on: " + GnewData[i]);
      if (GnewData[i] == "X") {
        e.innerHTML = "X";
      } else if (GnewData[i] == "O") {
        e.innerHTML = "O";
      } 
    } // for
  });
}

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
  //currentPlayer = (currentPlayer == "X" ? "O" : "X" );
  
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
    showLightBox("Contrats! You Won!"); 
    return true;
  }
  if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
    showLightBox("Contrats! You Won!"); 
    return true;
  }
  if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
    showLightBox("Contrats! You Won!"); 
    return true;
  }
  if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
    showLightBox("Contrats! You Won!"); 
    return true;
  }
  if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
    showLightBox("Contrats! You Won!"); 
    return true;
  }
  if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
    showLightBox("Contrats! You Won!"); 
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

function toNumber(str) {
  let number = 0; 
  switch (str) {
    case "one": number = 1; break;
    case "two": number = 2; break; 
    case "three": number = 3; break; 
    case "four": number = 4; break; 
    case "five": number = 5; break; 
    case "six": number = 6; break; 
    case "seven": number = 7; break; 
    case "eight": number = 8; break; 
    case "nine": number = 9; break;  
  }
  return number; 
}

function toString(number) {
  let str = ""; 
  switch (number) {
    case 0: str = "one"; break;
    case 1: str = "two"; break;
    case 2: str = "three"; break;
    case 3: str = "four"; break;
    case 4: str = "five"; break;
    case 5: str = "six"; break;
    case 6: str = "seven"; break;
    case 7: str = "eight"; break;
    case 8: str = "nine"; break;
     
  }
  return str; 
}











