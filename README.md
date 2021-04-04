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
 5. Copy and paste the following code into tictactoe.js: 
```
const numPlayersDB = firebase.database().ref('numPlayers');
numPlayersDB.set(1);
```
 6. Now load your Tic Tac Toe game in a browser on localhost:5000 and look at the RealTime Database in the Firebase Console, and you should see numPlayers = 1. This means it's working!
 

## TASK 3: Now that the database knows when each user is online, you need to tell the database who's turn it is. 
1. Examine the code in tictactoe.js and read the Firebase docs for reading and writing here: <https://firebase.google.com/docs/database/web/read-and-write> 
2. Inside `function playerTakeTurn(e) {}`, read the data in ONCE using [THIS COMMAND](https://firebase.google.com/docs/database/web/read-and-write#read_data_once) and if it's player 1's turn let them place their piece (NEXT TASK) and if not, show the lightbox and tell them it's not their turn. 

TASK 5 🐙 : If it's the players turn, let them make a move locally (code is already in template) and add code to update that players grid in the database. 
1. Use [GRID UPDATE COMMAND](https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields) to update specific fields of the database without resetting the entire entry. 
2. After the player has made their move and saved it to the database, set the *turn* field of the database to the other user

TASK 6 🦜: Update the grid on the local device from the other players grid in the database (If you're player 1, read player 2's grid and update your own AND vise versa)
1. I suggust writing an `function updateGrid() {}` that reads the other players grid from the database in an ASYNC way. For this, use the *database.on* command built into firebase. Read more about it [HERE](https://firebase.google.com/docs/database/web/read-and-write#listen_for_value_events) This function is designed as a LISTENER which means it will run everytime the database is updated. 
2. Loop through the other players grid and everytime it finds a letter, update the local grid to match it
3. Run the update grid function just once, on the load of the website since it's ASYNC, it will automatically run everytime the database is updated. 
