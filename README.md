## Welcome to the Multiplayer Tic Tac Toe Project! 

#### Watch this video to see what the project is going to look like: <https://youtu.be/Q34AhRnuIIo> 

If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new).

## TASK 1: Run a Firebase Project on your local machine (using a server).
#### Demo of task 1: <https://youtu.be/n9CmOiX7M5E>
##### Steps confirmed Sept 2023.
  1. Download the base code for this project. 
  2. Store the code on your local machine in a folder. This folder will now be referred to as your "project folder."
  3. Go to <https://firebase.google.com/> and setup your account.
  4. Once you have an account, go to the Firebase console <https://console.firebase.google.com/>.
  5. Create a new project, don't enable Google Analytics. Click "Create Project" and when it is done, "Continue".
  6. Add a web app `</>`, give it a name like "TicTacToe", select "Firebase hosting". Click "Register app".
  7. Under **Add Firebase SDK** select ***Use a script tag***. Copy and paste the code provided into the top of your js file without the HTML script tag.
  8. Ignore Installing the Firebase CLI (you do this in the next step) and you can also ignore the "Deploy to Firebase Hosting". Click "continue to the console".
     
*Leave the Firebase website for now.*

*Stop watching the video at this point.*
  
  #### Set up Instructions Out of Date in the Video
  9. Download the Window Standalone Binary Firebase CLI <https://firebase.google.com/docs/cli#windows-standalone-binary> and save `firebase-tools-instant-win.exe` on your H drive in an easy to find location.
  10. From your project folder, and make sure you have an `H:\` path, not a `\\s49fs\` path, run the `firebase-tools-instant-win.exe`. It takes a REALLY LONG TIME to get to a command prompt, but eventually it will. A command prompt looks like this: >
  11. Run `firebase login`. This should open a web browser and let you log in with a google account. IF THIS FAILS: Run `firebase login:ci`. It will give you a url. Open this url in a browser and login with a Google account.  It will then print something like this:
  ```
  Success! Use this token to login on a CI server:

1//06NSQx4pMI1g5CgYIARAAGAYSNwF-L9IrPV0PUromk3iwQcyBmcCgiSfFBqI8TXWdDrAgvYWNJafCEdb0ZPwIsz2r2I1hdzOsGAI

Example: firebase deploy --token "$FIREBASE_TOKEN" 
```
  12. To see if you are logged in correctly, list your firebase projects with  `firebase projects:list`. If you have to use a token it will look something like this:
  `firebase projects:list --token "1//06NSQx4pMI1g5CgYIARAAGAYSNwF-L9IrPV0PUromk3iwQcyBmcCgiSfFBqI8TXWdDrAgvYWNJafCEdb0ZPwIsz2r2I1hdzOsGAI" `
  
  Either way, you should see the project you just created.
  
  13. Navigate to your project folder using the change directory command. Mine looks like this:  `cd "H:\Documents\webdev12\myprojectfolder" `
  14. Now run `firebase init` (with the token if needed)
  to setup your project. Follow the instructions you're prompted with, first by hitting space on `Realtime Database` and `Hosting: Configure files for Firebase Hosting` to select them for your project. Next select `use existing project` and choose the project you just created. Finish the setup with default answers. Choose NOT to use Github. 
  15.  Now run `firebase emulators:start` This will run your local server. You will need to do this every time you want to view your project.

  *Note: You need Java 11 or higher for this to work. If you do, skip to the next step. If you have Java 10 or lower. Here is the work around:*
   - Extract the Java 11 zip file onto your H drive in an easy to find location: right click and select save as: [jdk-11.0.17_windows-x64_bin.zip]<http://mdinfotech.net/downloads/jdk-11.0.17_windows-x64_bin.zip>
   - In the same folder that you saved `firebase-tools-instant-win.exe` create a new text file, name it `java11.bat` and put the following code in it:
```
@echo off
echo Setting JAVA_HOME
set JAVA_HOME=H:\Documents\software\jdk-11.0.17
echo setting PATH
set PATH=H:\Documents\software\jdk-11.0.17\bin;%PATH%
echo Display java version
java -version
```
   Be sure to replace `H:\Documents\software\jdk-11.0.17` with the path to your jdk.
   - From the  `firebase-tools-instant-win.exe` command line, run the bat file by navigating to the directory containing `java11.bat` and typing in: `java11.bat`. It  will take a few minutes, but will say you have java version 11. This bat file will have to be run everyday until the IT dept updates our java version.
  
  16. If you go to a new browser tab, and type in `http://localhost:5000` you will see the website currently associated with this Firebase project.
  
<!--  9. If not already done, install Node.js: On Windows, download and install [Node.js](https://nodejs.org/en/). 
  10. If not already done, install the Firebase Command Line Interface (CLI)- run Windows Powershell on your local machine, and install the Firebase CLI using `npm install -g firebase-tools` These instructions are modified from [npm instructions for Windows](https://firebase.google.com/docs/cli#windows-npm).  *You need a full path on the school computers. Mine looks like this: `& "C:\Program Files\nodejs\npm" install -g firebase-tools`
  11. In PowerShell, navigate to your project folder using the change directory command. Mine looks like this:  `cd "H:\Documents\webdev12\myprojectfolder"`
  12. Now run `firebase login` to sign into your Firebase account.  This will open a browser window and allow you to log in via the web. Allow firebase to access everything. *You need a full path on the school computers. Mine looks like this: `& "C:\Users\lwear\AppData\Roaming\npm\firebase" login`*
  13. To check you've logged in correctly, run `firebase projects:list` and you should see the project you just created. *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase projects:list.*
  14. Now run `firebase init` to setup your project. Follow the instructions you're prompted with, first by hitting space on `Database` and `Hosting` to select them for your project. Next select `use existing project` and choose the project you just created. Finish the setup with default answers. Choose NOT to use Github.   *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase init.*
  15. Now run `firebase emulators:start` This will run your local server. You will need to do this every time you want to view your project.  *You need a full path on the school computers. Mine looks like this: C:\Users\lwear\AppData\Roaming\npm\firebase emulators:start.*
  16. If you go to a new browser tab, and type in `http://localhost:5000` you will see the website currently associated with this Firebase project.
 -->
*NOTE #1: A firebase project will only run code in the `project_name/public/` folder. If you would like to change the name, open `project_name/firebase.json` and change the value of the `hosting { public: "public" }` to the name of the folder with your code in it.*

*NOTE #2: The next time you log in to your computer and want to work on the project, go into your project folder and run `firebase-tools-instant-win.exe`, then at the command line, run `firebase emulators:start` to start localhost.  You should not need to relogin to firebase, or reconnect your project again.*


<!--
*NOTE #2: The next time you log in to your computer and want to work on the project, go into your project folder and run "C:\Users\lwear\AppData\Roaming\npm\firebase emulators:start" to start localhost.  You do not need to relogin to firebase, or reconnect your project again.*
-->
## TASK 2: Create the database, and get your app to access the database.
### Demo of Task 2 using the old method: <https://youtu.be/2JFhsYWVWKo>
  1. Refer to STEP 3 of these instructions: <https://firebase.google.com/docs/web/setup> and for read/write directions go here: <https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1>
  2. In a browser, go to the [Firebase console of your project](https://console.firebase.google.com/). Choose your project, click the gear for "Project Settings".  Scroll down to "SDK Setup and Configuration" and select "CDN". Copy and paste the code from between the &lt;script> and &lt;/script> tags.  Now paste this code into the top of your JS file. (if you didn't already do so). This will be unique to each person.
  3. Go to the *Build > Realtime Database* on the left side of the Firebase console.
  4. Manually setup a child in your database by clicking "+" next to where it currently says "null".   Create the key `numPlayers` with a default value of 0. Click Add. 
  5. To allow the database to be accessed until June 30, 2023, you will need to replace the code under the tab "Rules" with the code below. Please update the date to be two months into the future from NOW.  Do this using an [epoch time converter](https://www.epochconverter.com/).
  ``` 
  {
  "rules": {
    ".read": "now < 1688151600000",  // epoch time for 2023-06-30 stops allowing use of database after this date
                                      // you need to update this to reflect a time two months into the future
    ".write": "now < 1688151600000",  // 2023-06-30, CHANGE THIS
  }
}
```
and click "Publish".

 6. Add the NEW code from below to tictactoe.js: 
```
  // Import the functions you need from the SDKs you need
  // 9.17.2 needs to be updated to the current version
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js"; 
 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // 9.17.2 needs to be updated to the current version
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js" // NEW

  // Your web app's Firebase configuration
  const firebaseConfig = {
   // this is specific to your project
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);  // NEW
  
  // Set NumPlayers to 1
  set(ref(database, 'numPlayers'),  1);  //NEW
```
 7. Now load your Tic Tac Toe game in a browser on localhost:5000, then look at the RealTime Database in the Firebase Console, and you should see numPlayers = 1. This means it's working!
 

## TASK 3: Listeners and connecting two players.
### Watch and complete Task 3, the video show the old methods: <https://youtu.be/vpt9o7O2-5I>

 1. How to write and read data to the database NEW METHOD: <https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1>.
 2. How to write listeners for any data change (on) and how to request data only once (once). NEW METHOD: <https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1>.
 
## TASK 4: Take a turn and push it to the database.
### Watch and complete Task 4: <https://youtu.be/ri25ktZjZtk>
 1. Create a representation of the game board in the program and database. See <https://firebase.google.com/docs/database/web/structure-data> and lists: <https://firebase.google.com/docs/database/web/lists-of-data>
 2. When a user clicks the board, save it to the database. See `push` : <https://firebase.google.com/docs/database/web/read-and-write#web-version-9_1>
 3. Inform all users of the change in data and update all the screens.
 4. ***Things that have changed since the video was recorded****
 
 a. To get function calls to work with modules, change:
 ```
 function playerTakeTurn(e) {...}
 ```
 to
 ```
 window.playerTakeTurn(e) = function (e) {...}
 ```

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

## TASK 7: Deal with state changes in number of players.
### Watch and complete Task 7: <https://youtu.be/joHpUGe-RA4> 
 1. Modify `updateGame()` so that:
    - detect state changes and take non-final actions: if both players are online update bothPlayersOnline
    - detect state changes and take final actions: both players online and someone disconnects, only one player, gameBoard is null.

## TASK 8: Turn it into a PWA, and launch it on the Firebase Web Servers.
 1. By now, you should know how to turn a website into a PWA. so go ahead and to it
 2. You may want to look at Offline Functionality: <https://firebase.google.com/docs/database/web/offline-capabilities>
 2. Go to <https://firebase.google.com/docs/hosting/test-preview-deploy#deploy-project-directory-to-live> and follow the instructions to deploy your local project to your live firebase channel.  This means firebase will host your app and make it available online at a url like this one: https://tictactoetrial1234.web.app/. 
