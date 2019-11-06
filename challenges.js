/*
UPDATED JS FILE WITH CHALLENGES
*/

// Declaring variables
let scores, roundScore, activePlayer, dice, gamePlaying;
init();
let lastDice;

// Hides the dice at the start
document.querySelector('.dice').style.display = 'none';

// "Roll Dice" button & event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random number
		let dice1 = Math.floor(Math.random() * 6) + 1;
		let dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

		// 3. Update round score IF the rolled number was NOT a NUMBER 1
		if (dice1 !== 1 && dice2 !== 1) {
			// Add's score
			// Updates round score
			// Displays the round score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}

		// 3. If number 6 is rolled twice in a row then the player's score is deleted
		/* if (dice === 6 && lastDice === 6) {
			// Player loses score
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice !== 1) {
			// 4. Update round score IF the rolled number was NOT a NUMBER 1
			// Add's score
			// Updates round score
			// Displays the round score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
		lastDice = dice;
        */
	}
});

// Setting up an event listener for the "Hold" button
document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add CURRENT score to the players GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Input Field
		let input = document.querySelector('.final-score').value;
		let winningScore;
		// Undefined, 0, null or "" are COERCED to False
		// Anything else is COERCED to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// Check if player won the game then shows who won
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

// Change the active player when HOLD is clicked
function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

// Creating a event listener for the "New Game" button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [ 0, 0 ];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	// Hides the dice
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	// Default and new scores to zero
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// Resetting player names
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	// Remove the "Winner" name
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

// Adding, removing and toggling classes (for reference)
// document.querySelector('.player-0-panel').classList.remove('active');
// document.querySelector('.player-1-panel').classList.add('active');
// document.querySelector('.player-1-panel').classList.toggle('active');
