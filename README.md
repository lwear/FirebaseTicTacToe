## Welcome to the Multiplayer Tic Tac Toe Project! 

#### Watch this video to see what the project is going to look like: <https://youtu.be/Q34AhRnuIIo> 

If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new).

## TASK 1: Run a Firebase Project on your local machine (using a server).
### Demo of task 1: <https://youtu.be/n9CmOiX7M5E>
  1. Download the base code for this project. 
  2. Store the code on your local machine in a folder. This folder will now be referred to as your "project folder."
  3. Go to <https://firebase.google.com/> and setup your account.
  4. Once you have an account, go to the Firebase console <https://console.firebase.google.com/>.
  5. Create a new project, don't enable Google Analytics. Click "Create Project" and when it is done, "Continue".
  6. Add a web app `</>`, give it a name like "TicTacToe", select "Firebase hosting". Click "Register app".
  7. The Firebase site will provice you with some html scripts under the title **Add Firebase SDK**. Ignore it for now. Also ignore Installing the Firebase CLI (you do this in the next step) and you can also ignore the "Deploy to Firebase Hosting". Click "continue to the console".
  8. Leave the Firebase website for now.
  9. If not already done, install Node.js: On Windows, download and install [Node.js](https://nodejs.org/en/). 
  10. If not already done, install the Firebase Command Line Interface (CLI)- run Windows Powershell on your local machine, and install the Firebase CLI using `npm install -g firebase-tools` These instructions are modified from [npm instructions for Windows](https://firebase.google.com/docs/cli#windows-npm).  *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\npm install -g firebase-tools.*
  11. In PowerShell, navigate to your project folder using the change directory command. Mine looks like this:  `cd "H:\Documents\webdev12\myprojectfolder"`
  12. Now run `firebase login` to sign into your Firebase account.  This will open a browser window and allow you to log in via the web. Allow firebase to access everything. *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase login.*
  13. To check you've logged in correctly, run `firebase projects:list` and you should see the project you just created. *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase projects:list.*
  14. Now run `firebase init` to setup your project. Follow the instructions you're prompted with, first by hitting space on `Database` and `Hosting` to select them for your project. Next select `use existing project` and choose the project you just created. Finish the setup with default answers and yes.   *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase init.*
  15. Now run `firebase emulators:start` This will run your local server. You will need to do this every time you want to view your project.  *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase emulators:start.*
  16. If you go to a new browser tab, and type in `http://localhost:5000` you will see the website currently associated with this Firebase project.
  
 

*NOTE: A firebase project will only run code in the `project_name/public/` folder. If you would like to change the name, open `project_name/firebase.json` and change the value of the `hosting { public: "public" }` to the name of the folder with your code in it.*

## TASK 2: Create the database, and get your app to access the database.
### Demo of Task 2: <https://youtu.be/2JFhsYWVWKo>
  1. To get your app to make use of Firebase, at the top of `<head>` in index.html, add the firebase library, and database library with these links 
  ```
    <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
  ```
    
  2. In a browser, go to the [Firebase console of your project](https://console.firebase.google.com/). Choose your project, click the gear for "Project Settings".  Scroll down to "Firebase SDK snippet" and select "CDN". Copy and paste the code from between the &lt;script> and &lt;/script> tags.  Now paste this code into the top of tictactoe.js. This will be unique to each person.
  3. Go to the *Realtime Database* on the left side of the Firebase console and click "Create Database". Choose "Start in Test Mode" and click "Enable." 
  4. Manually setup a child in your database by clicking "+" in the white screen under the "Data" tab.   Create `numPlayers` with a default value of 0. 
  5. To allow the database to be accessed until June 30, 2021, you will need to replace the code in `your_project_folder/database.rules.json
  ``` 
  {
  "rules": {
    ".read": "now < 1625094901000",  // epoch time for 2021-06-30 stops allowing use of database after this date
    ".write": "now < 1625094901000",  // 2021-06-30
  }
}
```
 6. Copy and paste the following code into tictactoe.js: 
```
const numPlayersDB = firebase.database().ref('numPlayers');
numPlayersDB.set(1);
```
 7. Now load your Tic Tac Toe game in a browser on localhost:5000 and look at the RealTime Database in the Firebase Console, and you should see numPlayers = 1. This means it's working!
 

## TASK 3: Listeners and connecting two players.
### Watch and complete Task 3: <https://youtu.be/vpt9o7O2-5I>
 1. What to do if `firebase emulators:start` throws an error.
 2. How to write data to the database.
 3. How to get data from the database.
 4. How to write listeners for any data change (on) and how to request data only once (once).
 
## TASK 4: Take a turn and push it to the database.
### Watch and complete Task 4: <https://youtu.be/ri25ktZjZtk>
 1. Create a representation of the game board in the program and database.
 2. When a user clicks the board, save it to the database.
 3. Inform all users of the change in data and update all the screens.

## TASK 5: Controlling User Input
### Watch and complete Task 5: <https://youtu.be/DXlXyjjjX2c>
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
 1. Add win/lose/tie code to updateGame
 2. Write `checkWin()`. Video only covers 1 of 8 cases. Students are expected to complete method.

## TASK 7: Deal with state changes.
### Watch and complete Task 7: <https://youtu.be/ri25ktZjZtk> 
 1. Modify `updateGame()` so that:
    - detect state changes and take non-final actions: if both players are online update bothPlayersOnline
    - detect state changes and take final actions: both players online and someone disconnects, only one player, gameBoard is null,

