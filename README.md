## Welcome to the start of your multiplayer tic-tac-toe project! 


#### The most recent demo version will always be avalible here: <https://tictactoe-2cc0f.web.app/>

#### If you are really stuck, you can look at the source code for the most recent version, but Mrs. Wear will check if you just copy and pasted...👀 so don't. 

This project will be broken down into different stages, and I will post source code, and live demo for the next stage up here as soon as I have it functional. 

TASK 1 🐳 : Your task, should you choose to accept, is to start a *firebase* project with the [Firebase Command Line Interface](https://firebase.google.com/docs/cli)
and host it on a local server
  1. Install the Firebase CLI on your machine using `npm install -g firebase-tools` in your console of choice (Windows Command Prompt)
  2. Go to <https://firebase.google.com/> and setup your account and create a new project
  3. Navigate to your project folder and run `firebase login` to sign into your account you just created a new project in
  4. To check you've logged in correctly, run `firebase projects:list` and you should see the project you just created
  5. Now run `firebase init` to setup your project. Follow the instructions you're prompted with, first by hitting space on `Database` and `Hosting` 
  to select them for your project. Next select `use existing project` and choose the project you just created. Finish the setup with default answers and yes. 
  6. Now run `firebase serve` This will run your local server. You will need to do this every time you want to view your project. 
  
TASK 2 🐤 : Now that your local server is running, it's time to get things going! Now we're going to replace the default code with the *tic-tac-toe* codebase Mrs. Wear will give
you. 
  1. First delete `public/index.html` in your project folder
  2. Now in `public/` copy the index.html, tictactoe.js, tictactoe.css, and x.png
  3. In the head of index.html you'll need to add the firebase library, and database library with these links 
  ```
    <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js"></script>

    <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-database.js"></script>
  ```
    
  4. Now in tictactoe.js, you'll need to add your API reference at the top of the file. This will be unique to each person and you can find it in your *settings -> project settings*
  in the [firebase console of your project](https://console.firebase.google.com/)
  
TASK 3 🐢 : Epic. Now you're ready to actually write some sick code. The first part of this project is going to be setting up the database to recognize when player 1 and player 2 are 
online. 
  1. Take a look at the demo site to see how this will work. Duplicate the site and see what happens to the sub-header text. Now close tab and see what happens. READ the firebase
  docs for reading and writing here: <https://firebase.google.com/docs/database/web/read-and-write> 
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
