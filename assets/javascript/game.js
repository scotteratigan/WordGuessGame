// Hangman v1.0 by Scott E Ratigan 2018/10/06
// Uses bootstrap buttons & modals, as well as sound effects.

// Game begins once user clicks #start-hangman-game button.
// Keyboard input is checked for valid letters. Uppercase letters are converted to lowercase. Invalid input is ignored.
// User can also click the unguessed letter buttons to guess a letter.
// Game proceeds until all letters are correctly guessed, or user runs out of guesses.
// When game ends, a Game Won or Game Lost modal is displayed.

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // Array that helps display the user guesses
var computerSecretPhrase = ""; // The magic phrase to guess, populated randomly when game starts.
var gameInProgress = false; // Allows ignoring keyboard input and button clicks of letters if game is over.
var guessedLetterList = []; // Array of letters that have already been guessed.
const maxWrongGuesses = 9; // Number of incorrect guesses allowed before game is over.
var phrasesToGuess = ["gastropub", "farm to table", "edison bulb", "homemade bitters", "ironic tattoo", "eight bits", "single origin coffee", "ironic prose", "taxidermied fish", "cornhole tournament", "pabst blue ribbon", "homemade kombucha", "succulent garden", "beard fashion", "vegan beef", "free range veggies", "neon fanny pack"]; // the secret list of solutions - DON'T CHEAT AND LOOK AT THIS!!11 todo: hash the phrases so that the TAs can't cheat!
var userGuessDisplay; // Shows which letters are guessed correctly, also used to see if win condition met - no underscores present means user has correctly guessed all letters.
var wrongGuessCount = 0; // Number of times the player has guessed a letter that isn't in the solution.
var wins = 0; // The number of games won.
var losses = 0; // The number of games lost.
// Sound assets:
var correctSound = new Audio("assets/sounds/ding.mp3");
var wrongSound = new Audio("assets/sounds/error.mp3");
var gameLostSound = new Audio("assets/sounds/uhoh.mp3");
var gameWonSound = new Audio("assets/sounds/tada.mp3");

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
	var newHangmanAreaHTML = "";
	switch (wrongGuessCount) {
		case 0:
			newHangmanAreaHTML = "";
			break;
		case 1:
			newHangmanAreaHTML = '<img src="assets/images/1.png">';
			break;
		case 2:
			newHangmanAreaHTML = '<img src="assets/images/2.png">';
			break;
		case 3:
			newHangmanAreaHTML = '<img src="assets/images/3.png">';
			break;
		case 4:
			newHangmanAreaHTML = '<img src="assets/images/4.png">';
			break;
		case 5:
			newHangmanAreaHTML = '<img src="assets/images/5.png">';
			break;
		case 6:
			newHangmanAreaHTML = '<img src="assets/images/6.png">';
			break;
		case 7:
			newHangmanAreaHTML = '<img src="assets/images/7.png">';
			break;
		case 8:
			newHangmanAreaHTML = '<img src="assets/images/8.png">';
			break;
		case 9:
			newHangmanAreaHTML = '<img src="assets/images/9.png">';
			break;
		case 10:
			newHangmanAreaHTML = '<img src="assets/images/10.png">';
			break;
	}
	if (newHangmanAreaHTML != hangmanArea.innerHTML) {
		hangmanArea.innerHTML = newHangmanAreaHTML; // only update the HTML if there's a change. (for performance)
	}
}

function displayRemainingLetters() { // shows the letters in the alphabet that haven't been guessed yet:
	var remainingLetterBox = document.getElementById("remaining-letters");
	var displayString = "";
	for(var i = 0; i < alphabet.length; i++) {
		let letter = alphabet[i];
		displayString += "<div class='col-1'>";
		if (!guessedLetterList.includes(letter)) {
			// display letter as a clickable button with an event attached to it. Passes the letter as an argument to the userGuessesLetter function.
			displayString += "<button class='m-1 px-auto btn-primary' onclick='userGuessesLetter(\"" + letter + "\")'>" + letter + "</button>";
		}
		else {
			displayString += "<button class='m-1 px-auto border-0 bg-white'>_</button>";
		}
		displayString += "</div>";
	}
	remainingLetterBox.innerHTML = "<div class='row'>" + displayString + "</div>";
}

function displayScore() { // show the totals for games won vs lost:
	var scoreArea = document.getElementById("score-area");
	scoreArea.innerHTML = "<p>Wins: " + wins + " , Losses: " + losses + "</p>";
}

function startHangmanGame() { // begin a new game. Initialize all variables and update all relevant divs.
	gameInProgress = true;
	wrongGuessCount = 0;
	computerSecretPhrase = phrasesToGuess[Math.floor(Math.random() * phrasesToGuess.length)]; // selects a random phrase from the array
	guessedLetterList = []; // resets the list of guessed letters
	displayScore(); // now, update all game areas
	displayGuessArea();
	displayRemainingLetters();
	displayGuessesRemaining();
	document.getElementById("start-hangman-game").classList.add("invisible"); // make "START NEW GAME" button invisible until game is over
	displayHangman();
}

function userGuessesLetter(userKey) {
	if (guessedLetterList.includes(userKey)) {
		return; // Letter was already guessed, ignore input.
	}
	guessedLetterList.push(userKey); // add letter to list of guessed letters
	displayGuessesRemaining();
	displayGuessArea();
	displayRemainingLetters();
	if (computerSecretPhrase.includes(userKey)) { // Good guess, letter is in the secret phrase.
		correctLetterGuessed();
	}
	else { // Bad Guess, this letter is not in the secret phrase.
		wrongLetterGuessed();
	}
}

function correctLetterGuessed() {
	correctSound.play();
	if (!userGuessDisplay.includes('_')) {
		// If there are no underscores left in display, user has won.
		gameIsWon();
	}
}

function wrongLetterGuessed() {
	wrongSound.play();
	wrongGuessCount++;
	displayHangman();
	if (wrongGuessCount > maxWrongGuesses) { // User has lost the game :/
		gameIsLost();
	}
}

function gameIsWon() {
	gameWonSound.play();
	gameInProgress = false;
	wins++;
	displayScore();
	document.getElementById("game-won").click(); // fake a click to pop up a bootstrap 'won' modal
	document.getElementById("start-hangman-game").classList.remove("invisible"); // Make "START NEW GAME" button visible again.
}

function gameIsLost() {
	gameLostSound.play();
	gameInProgress = false;
	losses++;
	displayScore();
	document.getElementById("game-lost").click(); // fake a click to pop up a bootstrap 'lost' modal
	document.getElementById("start-hangman-game").classList.remove("invisible"); // make "START NEW GAME" button visible again
}

document.getElementById("start-hangman-game").onclick = startHangmanGame; // Begin the game when player clicks the "START GAME" button.

document.onkeyup = function(event) {
// Process keyboard inputs. Ensure input is valid and game is in progress before passing to userGuessesLetter.
// Passing to a separate function because that function will also handle clicks of letter-buttons.
	let keyPress = event.key.toLowerCase(); // convert case to lower, just in case capslock is on (it happens)
	if (!gameInProgress) {
		return // Game isn't in progress, ignore input.
	}
	if (keyPress < 'a' || keyPress > 'z') {
		return; // It's not a letter, ignore input.
	}
	if (keyPress.length > 1) {
		return; // Also not a letter, although the first character may be. Most likely a command key like "shift" on "control". Ignore input.
	}
	userGuessesLetter(keyPress); // Valid input, send it to the userGuessesLetter function.
}
