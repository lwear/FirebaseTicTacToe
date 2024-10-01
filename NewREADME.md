## Welcome to the Multiplayer Tic Tac Toe Project! 

#### Watch this video to see what the project is going to look like: <https://youtu.be/Q34AhRnuIIo> 

If you have any questions, issues, or concerns about the code, please create an issue [here](https://github.com/lwear/FirebaseTicTacToe/issues/new).


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
