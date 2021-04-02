## Welcome to the Multiplayer Tic Tac Toe Project! 

#### Demo Version: <https://tictactoe-2cc0f.web.app/> To use the demo, open it twice, in two different tabs. 

If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new).

## TASK 1: Run a Firebase Project on your local machine (using a server).
  1. Download the base code for this project. ****Note to self: need to test code in this project to make sure it will work****
  2. Store the code on your local machine in a folder. This folder will now be referred to as your "project folder."
  3. Go to <https://firebase.google.com/> and setup your account.
  4. Create a new project, don't enable Google Analytics. Click "Create Project" and when it is done, "Continue".
  5. Add a web app `</>`, give it a name like "TicTacToe", select "Firebase hosting". Click "Register app".
  6. The Firebase site will provice you with some html scripts under the title **Add Firebase SDK**. Ignore it for now. Also ignore Installing the Firebase CLI (you do this in the next step) and you can also ignore the "Deploy to Firebase Hosting". Click "continue to the console".
  7. Leave the Firebase website for now.
  8. On Windows, download and install [Node.js](https://nodejs.org/en/). 
  9. Install the Firebase Command Line Interface (CLI)L rfireun Windows Powershell on your local machine, and install the Firebase CLI using `npm install -g firebase-tools` These instructions are modified from [npm instructions for Windows](https://firebase.google.com/docs/cli#windows-npm)
  10. In PowerShell, navigate to your project folder using the change directory command:  `cd "H:\Documents\webdev12\myprojectfolder"`
  11. Now run `firebase login` to sign into your Firebase account.
  12. To check you've logged in correctly, run `firebase projects:list` and you should see the project you just created.
  13. Now run `firebase init` to setup your project. Follow the instructions you're prompted with, first by hitting space on `Database` and `Hosting` 
  to select them for your project. Next select `use existing project` and choose the project you just created. Finish the setup with default answers and yes. 
  6. Now run `firebase emulators:start` This will run your local server. You will need to do this every time you want to view your project. 
  7. If you go to a new browser tab, and type in `http://localhost:5000` you will see the website currently associated with this Firebase project.
  
 

*NOTE: A firebase project will only run code in the `project_name/public/` folder. If you would like to change the name, open `project_name/firebase.json` and change the value of the `hosting { public: "public" }` to the name of the folder with your code in it.*

## TASK 2: Create the database, and get your app to access the database.
  1. To get your app to make use of Firebase, at the top of `<head>` in index.html, add the firebase library, and database library with these links 
  ```
    <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
  ```
    
  2. In a browser, go to the [Firebase console of your project](https://console.firebase.google.com/). Choose your project, click the gear next to "Project Overview" and select "Project Settings".  Scroll down to "Firebase SDK snippet" and select "CDN". Copy and paste the code from between the &lt;script> and &lt;/script> tags.  Now paste this code into the top of tictactoe.js. This will be unique to each person.
  3. Go to the *Realtime Database* on the left side of the Firebase console and click "Create Database". Choose "Start in Test Mode" and click "Enable." 
  4. Manually setup the children for your database by and clicking "+" in the white screen under the "Data" tab.   Create p1 and p2 with a default value of 0. This is what my database structure looks like at the current stage ![image](https://raw.githubusercontent.com/lwear/FirebaseTicTacToe/master/public/dbStructure.PNG) 
  With a 1 if the user is online, and a 0 if the user is offline. Also create p1Grid and p2Grid as shown.
  5. To allow the database to be accessed until June 30, 2021, you will need to replace the code in `your_project_folder/database.rules.json
  ``` 
  {
  "rules": {
    ".read": "now < 1625094901000",  // 2021-06-30 stops allowing use of database after this date
    ".write": "now < 1625094901000",  // 2021-06-30
  }
}
```
 5. Now load your Tic Tac Toe game in a browser on localhost:5000.  It should now say "Waiting for second player to join".  This means it's working!
 6. Also, look at the RealTime Database in the Firebase Console, and you should see p1 showing "online:1".
 7. Now open the Tic Tac Toe  game in a second browser tab on localhost:5000 and it should say "Waiting fo opponent to move".  Go to the first tab with the game loaded and notice it now says "Your Move". Check the database again and notice that p2 now shows "online:1".
 8. Congratulations, your online database is now working.
 9. Now examine the code in tictactoe.js and read the Firebase docs for reading and writing here: <https://firebase.google.com/docs/database/web/read-and-write> 
 

## TASK 4 🦊 : Now that the database knows when each user is online, you need to tell the database who's turn it is. 
1. Add a child to your database called *turn* and set the default value to 1. 
2. Inside `function playerTakeTurn(e) {}`, read the data in ONCE using [THIS COMMAND](https://firebase.google.com/docs/database/web/read-and-write#read_data_once) and if it's player 1's turn let them place their piece (NEXT TASK) and if not, show the lightbox and tell them it's not their turn. 

TASK 5 🐙 : If it's the players turn, let them make a move locally (code is already in template) and add code to update that players grid in the database. 
1. Use [GRID UPDATE COMMAND](https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields) to update specific fields of the database without resetting the entire entry. 
2. After the player has made their move and saved it to the database, set the *turn* field of the database to the other user

TASK 6 🦜: Update the grid on the local device from the other players grid in the database (If you're player 1, read player 2's grid and update your own AND vise versa)
1. I suggust writing an `function updateGrid() {}` that reads the other players grid from the database in an ASYNC way. For this, use the *database.on* command built into firebase. Read more about it [HERE](https://firebase.google.com/docs/database/web/read-and-write#listen_for_value_events) This function is designed as a LISTENER which means it will run everytime the database is updated. 
2. Loop through the other players grid and everytime it finds a letter, update the local grid to match it
3. Run the update grid function just once, on the load of the website since it's ASYNC, it will automatically run everytime the database is updated. 
