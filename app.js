/*
GAME RULES [MODIFIED FROM ORIGINAL PIG DICE GAME]:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls two die as many times as he wishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- ALSO, if a player rolls a 6 twice consecutively, he loses his ENTIRE score.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game. However, the players have a choice to adjust the final winning score.
*/

/* Initialize game score variables.
 */
let roundScore = [0,0]; // Initialize round scores for both players starting from 0.
let globalScore = [0,0]; // Initialize global scores for both players starting from 0.
let imgHidden = false; // false indicates die images are shown; true indicates die images are hidden.
let playerTurn = 0; // 0 indicates Player 1 is playing; 1 indicates Player 2 is playing.
let gameEnd = false; // false indicates that game is being played; true indicates that game is over.
let winnerAnnounced = false; //false indicates winner has not been announced; true indicates winner has been announced.
let previousDiceRoll = null; // variable holds the previous values of the die roll. null indicates the die have not been rolled previously.

const currentScores = document.getElementsByClassName('player-current-score'); // Stores reference to the HTML elements that have class of '.player-current-score'.
const dice = [document.getElementsByClassName('dice')[0], document.getElementsByClassName('dice')[1]]; // Stores reference to the HTML img elements that shows the two die.
const playerName = [document.getElementById('name-0'), document.getElementById('name-1')]; // Stores reference to the HTML elements that show the players' names.
const globalScorePlayer = [document.getElementById('score-0'), document.getElementById('score-1')]; // Stores reference to the HTML elements that show the players' global score.
const roundScorePlayer = [document.getElementById('current-0'), document.getElementById('current-1')]; // Stores reference to the HTML elements that show players' round scores.
const panelPlayer = [document.getElementsByClassName('player-0-panel')[0], document.getElementsByClassName('player-1-panel')[0]]; // Stores reference to the HTML elements that show the players' panels.
const rollBtn = document.getElementsByClassName('btn-roll')[0]; // Stores reference to the die roll button.
const hldBtn = document.getElementsByClassName('btn-hold')[0]; // Stores reference to the hold button.
const newBtn = document.getElementsByClassName('btn-new')[0]; // Stores reference to the new game button.

/* This function sets the display style property of the die img elements to the value passed to the function.
 */
function displaySetDice(displayValue) {
    const displayPropertyValue = 'display:' + displayValue; // Store property-value pair of the die img elements to set.
    for (let i = 0; i < 2; i++) {
        dice[i].setAttribute('style', displayPropertyValue); // Set the display style property inline to the value passed to the function.
    }
}
/* Function outputs random number between 1 and 6.
 */
function generateRandomDiceNumber() {
    return [Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1)]; // Generate random number between 1 and 6.
}

/* Function changes the player and modifies the style of the player panels to indicate the player that is active and
the player that is non-active.
 */
function changePlayer() {
    previousDiceRoll = [null,null]; // Indicate that the new player has not rolled a previous die in the current turn.
    roundScore[playerTurn] = 0; // Reset the previous player round score when turn changes.
    roundScorePlayer[playerTurn].textContent = '0'; // Show player round score has been reset.
    const panelClassName = 'player-' + playerTurn + '-panel'; // Variable holds the class attribute of the panel of the player that is now non-active.
    panelPlayer[playerTurn].setAttribute('class', panelClassName); // Set the class attribute of the panel of the player that is now non-active.

    //Change player turn.
    if (playerTurn === 0) {
        playerTurn++; // Change to player 1 if player 0 is current player.
    } else {
        playerTurn--; // Change to player 0 if player 1 is current player.
    }

    displaySetDice('none'); //Hide the die.
    imgHidden = true; // Indicate die is hidden.

    const panelClassNameSwitchedPlayer = panelClassName + ' active'; // Variable holds the class of the panel of the player that is now active.

    panelPlayer[playerTurn].setAttribute('class', panelClassNameSwitchedPlayer); // Set the class attribute of the panel of the player that is now active.
}

/* This function changes the round score depending on die roll.
 */
function alterRoundScore(diceNumber) {
    if (diceNumber.includes(1)) { // If a 1 has been rolled.
        changePlayer(); // Call function that changes player.
    } else if (diceNumber.includes(6) && previousDiceRoll.includes(6)) { // If a player rolls a 6 consecutively.
        globalScore[playerTurn] = 0; // Player loses his entire score.
        globalScorePlayer[playerTurn].textContent = '0'; // Display that the global score is now 0.
        changePlayer(); // Call function that changes player.
    } else {
        roundScore[playerTurn] += (diceNumber[0] + diceNumber[1]); // Add die roll values to player round score.
        roundScorePlayer[playerTurn].textContent = roundScore[playerTurn]; // Show total round score after die roll.
        previousDiceRoll = diceNumber; // Save the previous die roll.
    }
}

/* Generate random die roll.
 */
function generateDice() {
    const randomDiceNumbers = generateRandomDiceNumber(); // Store random numbers between 1 and 6, which represent the die rolls.
    let srcPath; // Variable hold image path for a dice.
    for (let i = 0; i < 2; i++) {
        srcPath = 'dice-' + randomDiceNumbers[i] + '.png'; // Create path for image source.
        dice[i].setAttribute('src', srcPath); // Set src path of a dice img element.
    }

    if (imgHidden) { // If the die are hidden.
        displaySetDice('block'); // Show the die.
        imgHidden = false; // Indicate die is shown.
    }

    alterRoundScore(randomDiceNumbers); // Call function that changes the round score depending on die roll.
}

/* This function is called when a player has won: it removes the event listeners of the buttons that control the current
game and show on the UI which player has won.
 */
function callWinner() {
    rollBtn.removeEventListener('click', generateDice); // Remove roll button event listener because game has been won.
    hldBtn.removeEventListener('click', hldAddGlobalScore); // Remove hold button event listener because game has been won.

    const panelClassNameWinner = 'player-' + playerTurn + '-panel winner'; // Variable holds the class attribute of the panel of the player that has won.
    panelPlayer[playerTurn].setAttribute('class', panelClassNameWinner); // Set the class attribute of the panel of the player that has won.
    playerName[playerTurn].textContent = 'Winner!'; // The player that has won has the current turn and their name should be replaced with 'Winner!'.
    winnerAnnounced = true; // Indicate winner has been announced.
    displaySetDice('none'); //Hide the die.
    imgHidden = true; // Indicate die is hidden.
}

/* Function adds current round score of active player to global score and changes player turn.
 */
function hldAddGlobalScore() {
    const finalScoreInput = document.getElementById('final-score').value; // Get value from form input of final score.
    const winningScore = finalScoreInput ? finalScoreInput : 100; // If form input of final score is empty then make final score 100.
    globalScore[playerTurn] += roundScore[playerTurn]; // Add current player's round score to global score.
    globalScorePlayer[playerTurn].textContent = globalScore[playerTurn]; // Display the updated global score.
    // Check if player's score equalled or exceeded the winning score.
    if (globalScore[playerTurn] >= winningScore) {
        callWinner(); // Declare winner.
    } else {
        changePlayer(); // Call function that changes player.
    }
}

/* Generate a new game.
 */
function newGame() {
    gameEnd = true; //Indicate game has ended.
    if (winnerAnnounced) { // If winner has been announced.
        //If a player has won that means the player had the current turn in the previous game. Reset the player's name
        //from 'Winner!' to the default name because new game has been declared.
        playerName[playerTurn].textContent = 'Player ' + (playerTurn + 1);
    }
    resetGame(); //Reset the game.
}

/* Define function that resets the game.
 */
function resetGame() {
    if (gameEnd === true) { // Check if the game is being reset because the previous game has ended.
        for (let i = 1; i >= 0; i--) {
            roundScore[i] = 0; // Reset the round score of a player.
            globalScore[i] = 0; // Reset the global score of a player.
            if (i === 1) { // If Player 2 had the current turn in the previous game.
                panelPlayer[i].setAttribute('class', 'player-1-panel'); // Set the default class attribute of Player 2.
            } else {
                playerTurn = i; // Set turn to Player 1.
                panelPlayer[i].setAttribute('class', 'player-0-panel active'); //Set the default class attribute of Player 1 and make it active.
            }
            roundScorePlayer[i].textContent = '0'; // Reset displayed round score of a player.
            globalScorePlayer[i].textContent = '0'; // Reset displayed global score of a player.
        }
        gameEnd = false; // Indicate game has started.
    }

    rollBtn.addEventListener('click', generateDice, false); //Add click event listener on button with class 'btn-roll'.
    hldBtn.addEventListener('click', hldAddGlobalScore, false); //Add click event listener on button with class 'btn-hold'.

    //Reset all scores.
    for (let i = 0; i < 2; i++) {
        currentScores[i].textContent = '0'; //Show the player's round score has been set to 0.
        globalScorePlayer[i].textContent = '0'; // Show the player's global score has been set to 0.
    }

    displaySetDice('none'); //Hide the die.
    imgHidden = true; // Indicate die is hidden.
}

newBtn.addEventListener('click', newGame, false); //Add click event listener on button with class 'btn-new'.

resetGame(); //Start the game.