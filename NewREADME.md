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
## **Step 2: Create a New Project in Glitch**

1. **Go to Glitch**: [Visit Glitch](https://glitch.com/).  
2. **Create a New Project**:  
   * Choose **New Project \> glitch-hello-website**.  
3. **Edit Your Project**:  
   * Open the project and you’ll see the files editor. You will add Firebase configuration and integrate Firebase SDK in the project here.

   ## **Step 3: Add Firebase SDK to Glitch**

1. **Add Firebase SDK and Initialize Firebase**:  
* Open `index.html` and replace the `<script>` tag with this one:  
  html  
  Copy code  
  ```html
  <script type="module" src="/script.js" defer></script>
  ```
  * Open the `script.js` (or the main JS file where the game will run).  
  * Copy the code snippet from Step 1 into the top of your JavaScript file, before you use any Firebase services.

  ## **Step 4: Set Up Firebase Realtime Database in Glitch**

1. **Create Database Rules**:  
   * In the Firebase console, go to **Build \> Realtime Database**.  
   * Click **Create Database** and choose the location (make it public for testing, but you can add authentication later).

Set your Database Rules for public read/write during development using this JSON:  
Json (Copy code)  
```json
{
  "rules": {
    ".read": "now < 1730185200000",  // 2024-10-29
    ".write": "now < 1730185200000"  // 2024-10-29
  }
}

```

* To allow the database to be accessed until another date, update the date to two months into the future using an [epoch time converter](https://www.epochconverter.com/).  
2. **Write/Read Data to/from Firebase**:  
   * You’ll now use Firebase's JavaScript API to save and retrieve game state. For example, here’s how to save the state of a Tic-Tac-Toe board and listen for changes:

**Example JavaScript:**  
javascript  (`Copy code`)

```javascript
// Add this import near the top of your js file
import {
  getDatabase,
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Example: Save current game state to Firebase
const gameState = ["X", "O", "", "", "X", "", "O", "", ""];
set(ref(database, "games/game1"), {
  board: gameState,
  turn: "player1"
});

// Listen for changes in game state
const gameRef = ref(database, "games/game1");
onValue(gameRef, (snapshot) => {
  const data = snapshot.val();
  console.log("Game State:", data);
});

```

3. This will store the game’s state in the Realtime Database, and both players can sync the game board live.  
4. **Test Your App**:  
   * Run the web app in Chrome with the console open, and you should see the Game State printed in the console.  
   * Check out the data on Firebase by going to **Build \> Realtime Database** in the Firebase Console. You should see your data in the database\!  
   * Now, manually change the `"turn"` field to `"player2"` (instead of `"player1"`).  
   * Go back to your web app, and in the JavaScript console, you will see new output showing the change in data.

   







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
