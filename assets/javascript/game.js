var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // array of strings of valid game input
var computerSecretPhrase = ""; // the magic phrase to guess, populated randomly when game begins
var gameInProgress = false; // boolean to represent the game state, in progress or not (disables keyboard input if game not in progress)
var guessedLetterList = []; // the letters that have been guessed
const maxWrongGuesses = 10; // after this many wrong guesses, game over
var phrasesToGuess = ["gastropub", "farm to table", "edison bulb", "homemade bitters", "ironic tattoo", "eight bits", "single origin coffee", "ironic prose", "taxidermied fish", "cornhole tournament", "pabst blue ribbon", "homemade kombucha", "succulent garden", "beard fashion", "vegan beef", "free range veggies", "neon fanny pack"]; // the secret list of solutions - DON'T CHEAT AND LOOK AT THIS!!11
var userGuessDisplay; // shows which letters are guessed correctly, also used to see if win condition met - no underscores present
var wrongGuessCount; // number of times the player has guessed a letter that isn't in the solution
var wins = 0; // int that represents win total
var losses = 0; // int that represents loss total
// todo: hash the phrases so that the TAs can't cheat!

function displayGuessArea() { // Updates the div showing which letters have been correctly guessed
	var guessArea = document.getElementById("guess-area");
	userGuessDisplay = "";
	for(var i = 0; i < computerSecretPhrase.length; i++) {
		if (guessedLetterList.includes(computerSecretPhrase[i])) {
			// for each letter, if it's been guessed, display it
			userGuessDisplay += computerSecretPhrase[i];
		}
		else if (computerSecretPhrase[i] == " ") {
			// if instead of a letter, there's a space in the solution, represent that with a dash
			userGuessDisplay += "-";
		}
		else {
			// lastly, if the letter hasn't been guessed yet, display an underscore placeholder
			userGuessDisplay += "_";
		}
	}
	guessArea.innerHTML = "<p>" + userGuessDisplay + "</p>"; // now update the window
}

function displayGuessesRemaining() { // Updates the div showing the number of wrong guesses remaining:
	var guessesRemainingArea = document.getElementById("guesses-remaining");
	var wrongGuessesRemaining = maxWrongGuesses - wrongGuessCount;
	guessesRemainingArea.innerHTML = "<p>Wrong Guesses Remaining: " + wrongGuessesRemaining;
}

function displayHangman() { // Display a stick figure. The more wrong guesses, the deader he appears...
	var hangmanArea = document.getElementById("hangman-area");
	switch (wrongGuessCount) {
		case 0:
			hangmanArea.innerHTML = "";
			break;
		case 1:
			hangmanArea.innerHTML = '<img src="assets/images/1.png">';
			break;
		case 2:
			hangmanArea.innerHTML = '<img src="assets/images/2.png">';
			break;
		case 3:
			hangmanArea.innerHTML = '<img src="assets/images/3.png">';
			break;
		case 4:
			hangmanArea.innerHTML = '<img src="assets/images/4.png">';
			break;
		case 5:
			hangmanArea.innerHTML = '<img src="assets/images/5.png">';
			break;
		case 6:
			hangmanArea.innerHTML = '<img src="assets/images/6.png">';
			break;
		case 7:
			hangmanArea.innerHTML = '<img src="assets/images/7.png">';
			break;
		case 8:
			hangmanArea.innerHTML = '<img src="assets/images/8.png">';
			break;
		case 9:
			hangmanArea.innerHTML = '<img src="assets/images/9.png">';
			break;
		case 10:
			hangmanArea.innerHTML = '<img src="assets/images/10.png">';
			break;
	}
	
}

function displayRemainingLetters() { // shows the letters in the alphabet that haven't been guessed yet:
	var remainingLetterBox = document.getElementById("remaining-letters");
	var displayString = "";
	for(var i = 0; i < alphabet.length; i++) {
		if (!guessedLetterList.includes(alphabet[i])) {
			displayString += alphabet[i];
		}
		else {
			displayString += "_";
		}
	}
	remainingLetterBox.innerHTML = "<p>" + displayString + "</p>";
}

function displayScore() { // show the totals for games won vs lost:
	var scoreArea = document.getElementById("score-area");
	scoreArea.innerHTML = "<p>Wins: " + wins + " , Losses: " + losses + "</p>";
}

function startHangmanGame() { // begin a new game. Initialize all variables and update all relevant divs.
	gameInProgress = true;
	wrongGuessCount = 0;
	computerSecretPhrase = phrasesToGuess[Math.floor(Math.random() * phrasesToGuess.length)];
	guessedLetterList = [];
	displayScore();
	displayGuessArea();
	displayRemainingLetters();
	displayGuessesRemaining();
	document.getElementById("start-hangman-game").classList.add("invisible"); // make "START NEW GAME" button invisible until game is over
	displayHangman();
}

function userGuessesLetter(userKey) { // when a user has pressed a valid key, process the input:
	if (guessedLetterList.includes(userKey)) {
		return; // letter is already guessed, ignore input
	}
	// If here, user guessed a new letter, add to guessed list and check for win or loss
	displayGuessesRemaining();
	guessedLetterList.push(userKey); // add letter to list of guessed letters
	displayGuessArea();
	displayRemainingLetters();
	if (!userGuessDisplay.includes('_')) {
		// If there are no underscores left in display, user has won.
		gameInProgress = false;
		wins++;
		displayScore();
		document.getElementById("game-won").click(); // fake a click to pop up a bootstrap 'won' modal
		document.getElementById("start-hangman-game").classList.remove("invisible"); // make "START NEW GAME" button visible again
	}
	if (!computerSecretPhrase.includes(userKey)) { // Bad Guess, this letter is not in the secret phrase
		wrongGuessCount++;
		displayHangman();
		if (wrongGuessCount > maxWrongGuesses) { // User has lost the game :/
			gameInProgress = false;
			losses++;
			displayScore();
			document.getElementById("game-lost").click(); // fake a click to pop up a bootstrap 'lost' modal
			document.getElementById("start-hangman-game").classList.remove("invisible"); // make "START NEW GAME" button visible again
		}
	}
}

// events below this line:
document.getElementById("start-hangman-game").onclick = startHangmanGame; // begin the game when player clicks the "START GAME" button

document.onkeyup = function(event) { // process keyboard inputs. Ensure input is valid and game is in progress before passing to userGuessesLetter:
	let keyPress = event.key.toLowerCase(); // convert case to lower, just in case capslock is on (it happens)
	if (!gameInProgress) {
		return // game isn't in progress, abort
	}
	if (keyPress < 'a' || keyPress > 'z') {
		return; // it's not a letter, abort
	}
	userGuessesLetter(keyPress); // ok, valid input, send it to the userGuessesLetter function
}