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
let roundScore = [];
let globalScore = [];

/* Define function that resets the game.
 */
function resetGame() {
    const currentScores = document.getElementsByClassName('player-current-score'); // Select the HTML elements that have class of '.player-current-score'.
    const roundScores = document.getElementsByClassName('player-score'); // Select the HTML elements that have class of '.player-score'.
    const dice = document.getElementsByClassName('dice'); // Select the HTML img element that shows the dice.

    //Reset all scores.
    for (let i = 0; i < 2; i++) {
        currentScores[i].textContent = '0'; //Set the player current scores to 0.
        roundScores[i].textContent = '0'; // Set the player round scores to 0.
    }

    //Hide the dice.
    dice[0].setAttribute('style','display:none;');
}

//Reset the game.
resetGame();