/////////////////////////////////
/// GLOBAL VARS
/////////////////////////////////



////////////////////////////////////////
/// SETUP, including join and leave game
////////////////////////////////////////


  
/////////////////////////////////
/// LOGIC
/////////////////////////////////


// updateGame
// updates the user's screen every time there is a change
// in the database
function updateGame() {
  console.log("ENTER: updateGame()");

}

// take player turn 
// is called each time either player clicks a box in the board
// e is the block (or element) in the board that was clicked by the user
function playerTakeTurn(e) { 
  console.log("ENTER: playerTakeTurn(), element " + toNumber(e.id) + " clicked.");
} // playerTakeTurn 

////////////////////////////////////////
/// UTILITY FUNCTIONS (no data changes)
////////////////////////////////////////


// returns this player's symbol
// player 1 is X, player 2 is O
function playerSymbol() {
  if (playerNumber == 1)
    return ("X");
  else if (playerNumber == 2)
    return("O");
  else
    return "E"; //Meaning "Error"
}

// convert from name of element to number of element
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
} // toNumber

// convert from element number to name
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
} // toString

////////////////////////////////////////
/// DISPLAY FUNCTIONS (no data changes)
////////////////////////////////////////


// draw the gameboard on the screen
function drawGameBoard() {
  //draw Game Board
  if(gameBoard != null) {
    for (let i = 0; i < gameBoard.length; i++) {
        e = document.getElementById(toString(i));   
        e.innerHTML = gameBoard[i];
    }
  }
}

// updates message above gameBoard
function setMessage(message){
  let messageElement = document.getElementById('gameMessage');
  messageElement.innerHTML = message;
} // setMessage

// change the visibility of ID
// requires the css classes hidden and unhidden to be defined
// in the css file
function changeVisibility(divID) {
  var element = document.getElementById(divID);
 
  // if element exists, it is considered true
  if (element) {
    element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
  } // if 
} // changeVisibility

// display message in lightbox
function showLightBox(message) {
  // set message
  document.getElementById("message").innerHTML = message;
  
  // show lightbox 
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
  
} // showLightBox

// close light box
function continueGame() {
  //don't let them close the lightbox if the init did not finish correctly.
  if(playerNumber == null)
    return;
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
  // updateGame(); //do any updates that are needed. They may have been ignored while the lightbox was visible;
} // continueGame
