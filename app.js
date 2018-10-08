/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Initialize game score variables.
 */
let roundScore = [0,0]; // Initialize round scores for both players starting from 0.
let globalScore = [0,0]; // Initialize global scores for both players starting from 0.
let imgHidden = false; // false indicates dice image is shown; true indicates dice image is hidden.
let playerTurn = 0; // 0 indicates player 0 is playing; 1 indicates player 1 is playing.

const currentScores = document.getElementsByClassName('player-current-score'); // Select the HTML elements that have class of '.player-current-score'.
const roundScores = document.getElementsByClassName('player-score'); // Select the HTML elements that have class of '.player-score'.
const dice = document.getElementsByClassName('dice')[0]; // Select the HTML img element that shows the dice.
const roundScorePlayer = [document.getElementById('current-0'), document.getElementById('current-1')]; // Select the HTML elements that show players' round scores.
const panelPlayer = [document.getElementsByClassName('player-0-panel')[0], document.getElementsByClassName('player-1-panel')[0]]; // Select the HTML elements that show the players' panels.
const rollBtn = document.getElementsByClassName('btn-roll')[0]; // Select dice roll button.

/* Define function that resets the game.
 */
function resetGame() {

    //Reset all scores.
    for (let i = 0; i < 2; i++) {
        currentScores[i].textContent = '0'; //Set the player current scores to 0.
        roundScores[i].textContent = '0'; // Set the player round scores to 0.
    }

    //Hide the dice.
    dice.setAttribute('style','display:none;');
    imgHidden = true; // Indicate dice is hidden.
}

//Reset the game.
resetGame();

/* Function outputs random number between 1 and 6.
 */
function generateRandomDiceNumber() {
    return Math.floor((Math.random() * 6) + 1); // Generate random number between 1 and 6.
}

/* Function changes the player and modifies the style of the player panels to indicate the player that is active and
the player that is non-active.
 */
function changePlayer() {
    roundScore[playerTurn] = 0; // Reset the player round score if dice roll is 1.
    roundScorePlayer[playerTurn].textContent = '0'; // Show player round score has been reset.
    const panelClassName = 'player-' + playerTurn + '-panel'; // Variable holds the class attribute of the panel of the player that is now non-active.
    panelPlayer[playerTurn].setAttribute('class', panelClassName); // Set the class attribute of the panel of the player that is now non-active.

    /* Change player turn.
     */
    if (playerTurn === 0) {
        playerTurn++; // Change to player 1 if player 0 is current player.
    } else {
        playerTurn--; // Change to player 0 if player 1 is current player.
    }

    const panelClassNameSwitchedPlayer = panelClassName + ' active'; // Variable holds the class of the panel of the player that is now active.

    panelPlayer[playerTurn].setAttribute('class', panelClassNameSwitchedPlayer); // Set the class attribute of the panel of the player that is now active.
}

/* This function changer the round score depending on dice roll.
 */
function alterRoundScore(diceNumber) {
    if (diceNumber === 1) {
        changePlayer(); // Call function that changes player.
    } else {
        roundScore[playerTurn] += diceNumber; // Add dice roll to player round score.
        roundScorePlayer[playerTurn].textContent = roundScore[playerTurn]; // Show total round score after dice roll.
    }
}

/* Generate random dice roll.
 */
function generateDice() {
    const randomDiceNumber = generateRandomDiceNumber(); // Store random number between 1 and 6 into randomDiceNumber variable.
    const srcPath = 'dice-' + randomDiceNumber + '.png'; // Create path for image source.

    if (imgHidden) { // If dice is hidden.
        dice.setAttribute('style', 'display:block;');// Show the dice.
        imgHidden = false; // Indicate dice is shown.
    }

    dice.setAttribute('src', srcPath); // Set src path of dice img element.

    alterRoundScore(randomDiceNumber); // Call function that changes the round score depending on dice roll.
}

/* Add click event listener on button with class 'btn-roll'.
 */
rollBtn.addEventListener('click', generateDice, false); // Add event listener.