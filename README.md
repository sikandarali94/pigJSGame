# pigJSGame
A simple dice game coded in JavaScript.

I love the PIG dice game and played it non-stop when I was in primary school. I decided to code this simple game in JavaScript.
The CSS and HTML of this game were coded by Jonas Schmedtmann (https://github.com/jonasschmedtmann), however, the JavaScript was
coded from scratch by me without any tutorials. Jonas Schmedtmann has a course on Udemy that taught students how to code the PIG
game but I did not follow it at all. Feel free to check how different our JS code is from each other. I wanted to give myself 
the challenge of coding this game without any reference or help. This was a unique challenge for me as it combined both 
programming and gaming -- both activities that I enjoy a lot :).

The rules of the game are simple:
1. There are two players.
2. Each player has a turn rolling a dice. They can roll the dice as many times as they like. On each roll the value of the dice
is added to the player's current score.
3. However, here is the catch: if a player rolls a 1 then he or she lose their current score and it is the next player's turn.
Therefore, don't be greedy when rolling the dice.
4. A player can choose to 'Hold' during their turn and their current score is then added to their global score. Once a player chooses
to 'Hold' it is the next player's turn.
5. The first player to reach a global score of 100 wins the game.

When I finished coding the game with the rules above and testing it successfully I decided to modify the rules. These rule modifications
were given as challenges by Jonas Schmetdmann in the Udemy course. Again, I did not follow any of his code and completed the challenges
without any guidance.

These were the modified rules:
1. If a player rolls a 6 twice successively they lose their entire global score and it is the next player's turn (I wish I had played by 
this rule when I was in primary school: it made the game so much more intense).
2. The players can decide to change the final winning score from 100 to whatever they like. An input field was placed into the game where
they can write the final score. If the input field is left empty then the final winning score is 100.
3. Instead of rolling one dice each player rolls two die.

I wrote the JS code with full clarity and documented it extensively through commenting. Feel free to check my code or just have fun 
playing the game :).

This project was completed on: 14/10/2018.
Sikandar Ali.
