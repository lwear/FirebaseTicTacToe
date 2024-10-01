## Welcome to the Multiplayer Tic Tac Toe Project! 

#### Watch this video to see what the project is going to look like: <https://youtu.be/Q34AhRnuIIo> 

If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new).

# Step-by-Step Guide to Integrating Firebase with Glitch

## Ms. Wear’s Working Example
[Firebase on Glitch Example](https://firebase-on-glitch-example.glitch.me/) (available until Firebase trial ends)

## Step 1: Set Up a Firebase Project

1. **Go to Firebase Console**: [Visit Firebase Console](https://console.firebase.google.com/).
2. **Create a New Project**:
   - Click **Add Project**.
   - Name your project and follow the steps to create it (keep Google Analytics off for simplicity).
3. **Add a Web App**:
   - In the Firebase console, go to **Project Settings** and select **Add App > Web App**.
   - Register your app. Firebase will give you a code snippet containing your app's Firebase configuration (API keys, project ID, etc.). Under "Add Firebase SDK," select **Use `<script>` tag**.
   - Keep this snippet handy—you will need it for Glitch.

### Example Firebase Configuration:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp3CGFgoaNxQ24kkTBplhwpOhVKJGoxNo",
  authDomain: "tictactoe2024-71b13.firebaseapp.com",
  projectId: "tictactoe2024-71b13",
  storageBucket: "tictactoe2024-71b13.appspot.com",
  messagingSenderId: "80518267625",
  appId: "1:80518267625:web:d73ee6e3b1fe4a401d6678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```
## TASK 3: Reading and Writing to the Database

 1. How to write data to and read data from (on value change or only once) the database: <https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1>.
 
## TASK 5: Controlling User Input
### Watch and complete Task 5: <https://youtu.be/DXlXyjjjX2c>
#### Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.
 1. Modify `playerTakeTurn()` so that: 
    - it checks if we are in a state that a turn cannot be taken
    - if it's my turn, let me take it (need to write `isMyTurn()` and `getNumTurns()`).
    - if it's not my turn, show a message and don't let me go
    - if a box is already selected, show a message, and don't allow any changes
  
 2. Modify `updateGame()` so that:
    - if the lightbox is visible, do nothing
    - if it's a turn, `setmessage` instructions for the user
  
## TASK 6: Determine a win, loss, or tie.
### Watch and complete Task 6: <https://youtu.be/AvrXMdKxMyw> 
#### Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.
 1. Add win/lose/tie code to updateGame
 2. Write `checkWin()`. Video only covers 1 of 8 cases. Students are expected to complete method.

## TASK 7: Deal with state changes in number of players.
### Watch and complete Task 7: <https://youtu.be/joHpUGe-RA4> 
#### Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.
 1. Modify `updateGame()` so that:
    - detect state changes and take non-final actions: if both players are online update bothPlayersOnline
    - detect state changes and take final actions: both players online and someone disconnects, only one player, gameBoard is null.

## TASK 8: Turn it into a PWA, and launch it on the Firebase Web Servers.
 1. By now, you should know how to turn a website into a PWA. so go ahead and to it
