# Welcome to the Multiplayer Tic Tac Toe Project! 

#### Watch this video to see what the project is going to look like: <https://youtu.be/Q34AhRnuIIo> 

If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new).

## Integrate Firebase with Glitch

### Step 1: Set Up a Firebase Project

1. **Go to Firebase Console**: [Visit Firebase Console](https://console.firebase.google.com/).
2. **Create a New Project**:
   - Click **Add Project**.
   - Name your project and follow the steps to create it (keep Google Analytics off for simplicity).
3. **Add a Web App**:
   - In the Firebase console, go to **Project Settings** and select **Add App > Web App**.
   - Register your app. Firebase will give you a code snippet containing your app's Firebase configuration (API keys, project ID, etc.). Under "Add Firebase SDK," select **Use `<script>` tag**.
   - Keep this snippet handy—you will need it for Glitch.

**Example Firebase Configuration:**

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
### **Step 2: Create a New Project in Glitch**

1. **Go to Glitch**: [Visit Glitch](https://glitch.com/).  
2. **Create a New Project**:  
   * Choose **New Project \> glitch-hello-website**.  
3. **Edit Your Project**:  
   * Open the project and you’ll see the files editor. You will add Firebase configuration and integrate Firebase SDK in the project here.

### **Step 3: Add Firebase SDK to Glitch**

1. **Add Firebase SDK and Initialize Firebase**:  
   * Open the `script.js` (or the main JS file where the game will run).  
   * Copy the code snippet from Step 1 into the top of your JavaScript file, before you use any Firebase services.
   * Open `index.html` and replace the `<script>` tag with this one:
  ```html
  <script type="module" src="/script.js" defer></script>
  ```

   * Note: You may notice `type=module` is used in the `script` tag.  Modules in JS are a newer way of organizing multiple js files to make code more maintainable.  I use it here because most of the firebase documentation also uses it. Using modules does affect the syntax you use. For example, having to assign `window.playerTakeTurn = playerTakeTurn;` in the javascript for TicTacToe to make `playerTakeTurn` callable from the HTML document.  To find out more about modules, read [JavaScript Modules Explained](https://www.turing.com/kb/javascript-modules).
    
### **Step 4: Set Up Firebase Realtime Database in Glitch**

1. **Create Database Rules**:  
   * In the Firebase console, go to **Build \> Realtime Database**.  
   * Click **Create Database** and choose the location (make it public for testing, but you can add authentication later).
   * To allow the database to be accessed until another date, update the date to two months into the future using an [epoch time converter](https://www.epochconverter.com/).  

Set your Database Rules for public read/write during development using this JSON:  
```json
{
  "rules": {
    ".read": "now < 1730185200000",  // 2024-10-29
    ".write": "now < 1730185200000"  // 2024-10-29
  }
}
```

2. **Write/Read Data to/from Firebase**:  
   * You’ll now use Firebase's JavaScript API to save and retrieve game state. For example, here’s how to save the state of a Tic-Tac-Toe board and listen for changes:

**Example JavaScript:**  
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

  ### Ms. Wear’s Working Example
[Firebase on Glitch Example](https://firebase-on-glitch-example.glitch.me/) (available until Firebase trial ends) 


## Write Interactive Tic Tac Toe
### **Step 1: Connect Two Players to the Game**
   1. Download the code base from [this github project](https://github.com/lwear/FirebaseTicTacToe).
   2. Add the code to your Glitch project created in the previous steps.
   3. Ensure the it runs on Glitch and validates before you continue.
   4. Add a `numplayers` value to the database to store the number of players that have joined the game.
   5. Enable the game to detect the number of players in the game and add all the functionality shown in this video (note:it uses the old methods to read/write data, you are expected to use the new methods) <https://youtu.be/vpt9o7O2-5I>. Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.


### **Step 2: Controlling User Input**
#### Watch and complete **Controlling User Input**: <https://youtu.be/DXlXyjjjX2c>
##### Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.
 1. Modify `playerTakeTurn()` so that: 
    - it checks if we are in a state that a turn cannot be taken
    - if it's my turn, let me take it (need to write `isMyTurn()` and `getNumTurns()`).
    - if it's not my turn, show a message and don't let me go
    - if a box is already selected, show a message, and don't allow any changes
  
 2. Modify `updateGame()` so that:
    - if the lightbox is visible, do nothing
    - if it's a turn, `setmessage` instructions for the user
  
### **Step 3: Determine a win, loss, or tie.**
#### Watch and complete Detect Win, Loss, or Tie: <https://youtu.be/AvrXMdKxMyw> 
##### Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.
 1. Add win/lose/tie code to `updateGame()`.
 2. Write `checkWin()`. Video only covers 1 of 8 cases. Students are expected to complete method.

### **Step 4: Deal with state changes in number of players.**
#### Watch and complete Dealing with Changes of State in NumPlayers: <https://youtu.be/joHpUGe-RA4> 
##### Note: all reads/writes in videos use an old method. Use the method from [this documentation](https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1) to do all modern read/writes.
 1. Modify `updateGame()` so that:
    - detect state changes and take non-final actions: if both players are online update bothPlayersOnline
    - detect state changes and take final actions: both players online and someone disconnects, only one player, gameBoard is null.
      
### **Step 5: Turn it into a PWA ,Pass Lighthouse Best Practices, Validate and No JS Errors.**
 1. By now, you should know how to turn a website into a PWA. so go ahead and to it.
 2. Include a Manifest with icons and no errors
 3. Include a service worker that caches the html, css and js.
 4. Get green on all areas of Lighthouse Test.
 5. Validate HTML and CSS, no JS errors.

### Evaluation
1. See [Evaluation Rubric](https://docs.google.com/document/d/1jjdrUIWAZcEaCODYzMZrD5FGWm9X02kN-ZDSrwBGDTc/edit?usp=sharing).
