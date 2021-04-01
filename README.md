## Welcome to the start of your multiplayer tic-tac-toe project! 

#### Demo Version: <https://tictactoe-2cc0f.web.app/> To USE the demo, open it twice, in two different tabs. 

### If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new)

TASK 1: Start a  basic Firebase project using the Firebase Command Line Interface and host it on a local server.
  1. Download the base code for this project. ****Note to self: need to test code in this project to make sure it will work****
  2. Store the code on your local machine in a folder. This folder will now be referred to as your "project folder."
  3. Go to <https://firebase.google.com/> and setup your account.
  4. Create a new project, don't enable Google Analytics. Add a web app and select hosting. Register app.
  5. The Firebase site will provice you with some html scripts. Copy and paste the code into index.html if required. 
  6. Install the Firebase Command Line Interface (CLI). On Windows, follow the [<code>npm</code> instructions for Windows](https://firebase.google.com/docs/cli#windows-npm)
     <br>After downloading and installing Node.js, run Windows Powershell on your local machine, and install the Firebase CLI using `npm install -g firebase-tools` 
  7. In PowerShell, navigate to your project folder using the change directory command:  `cd "H:\Documents\webdev12\myprojectfolder"`
  8. Now run `firebase login` to sign into your Firebase account.
  9. To check you've logged in correctly, run `firebase projects:list` and you should see the project you just created.
  10. Now run `firebase init` to setup your project. Follow the instructions you're prompted with, first by hitting space on `Database` and `Hosting` 
  to select them for your project. Next select `use existing project` and choose the project you just created. Finish the setup with default answers and yes. 
  6. Now run `firebase serve` This will run your local server. You will need to do this every time you want to view your project. 
  
TASK 2 🐤 : Now that your local server is running, it's time to get things going! Now we're going to replace the default code with the *tic-tac-toe* codebase Mrs. Wear will give you. 

*NOTE: A firebase project will only run code in the `project_name/public/` folder. If you would like to change the name, open `project_name/firebase.json` and change the value of the `hosting { public: "public" }` to the name of the folder with your code in it.*
  1. First delete `public/index.html` in your project folder
  2. Now in `public/` copy the index.html, tictactoe.js, tictactoe.css, and x.png
  3. In the head of index.html you'll need to add the firebase library, and database library with these links 
  ```
    <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js"></script>

    <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-database.js"></script>
  ```
    
  4. Now in tictactoe.js, you'll need to add your API reference at the top of the file. This will be unique to each person and you can find it in your *settings -> project settings*
  in the [firebase console of your project](https://console.firebase.google.com/)
  
TASK 3 🐢 : This task is to setup the database to recognize when a player is online OR not. There will be a message in the sub-heading on the FIRST window saying "Waiting for second player" 
online. 
  1. Take a look at the demo site to see how this will work. Open ANOTHER copy of the site and see what happens to the sub-header text. Now close tab and see what happens. READ the firebase docs for reading and writing here: <https://firebase.google.com/docs/database/web/read-and-write> 
  2. You will need to manually setup the children for your database by going to the *realtime database* on the firebase console and clicking *add children* and pick a name
  (player 1, and player 2?) with a default value of 0. This is what my database structure looks like at the current stage ![image](https://github.com/MatthewHightech/firebase-tic-tac-toe/blob/master/public/dbStructure.PNG) With a 1 if the user is online, and a 0 if the user is offline. 
  3. For anything to work, you will need to replace the code in `your_project_folder/database.rules.json
  ``` 
  {
  "rules": {
    ".read": "now < 1604476800000",  // 2020-11-4
    ".write": "now < 1604476800000",  // 2020-11-4
  }
}
```

TASK 4 🦊 : Now that the database knows when each user is online, you need to tell the database who's turn it is. 
1. Add a child to your database called *turns* and set the default value to 1. 
2. Inside `function playerTakeTurn(e) {}`, read the data in ONCE using [THIS COMMAND](https://firebase.google.com/docs/database/web/read-and-write#read_data_once) and if it's player 1's turn let them place their piece (NEXT TASK) and if not, show the lightbox and tell them it's not their turn. 

TASK 5 🐙 : If it's the players turn, let them make a move locally (code is already in template) and add code to update that players grid in the database. 
1. Use [GRID UPDATE COMMAND](https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields) to update specific fields of the database without resetting the entire entry. 
2. After the player has made their move and saved it to the database, set the *turn* field of the database to the other user

TASK 6 🦜: Update the grid on the local device from the other players grid in the database (If you're player 1, read player 2's grid and update your own AND vise versa)
1. I suggust writing an `function updateGrid() {}` that reads the other players grid from the database in an ASYNC way. For this, use the *database.on* command built into firebase. Read more about it [HERE](https://firebase.google.com/docs/database/web/read-and-write#listen_for_value_events) This function is designed as a LISTENER which means it will run everytime the database is updated. 
2. Loop through the other players grid and everytime it finds a letter, update the local grid to match it
3. Run the update grid function just once, on the load of the website since it's ASYNC, it will automatically run everytime the database is updated. 
