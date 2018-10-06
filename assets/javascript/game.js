var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var phrasesToGuess = ["gastropub", "farm to table", "edison bulb", "homemade bitters", "ironic tattoo", "eight bits", "single origin coffee", "ironic prose", "taxidermied fish", "cornhole tournament", "pabst blue ribbon", "homemade kombucha", "succulent garden", "beard fashion", "vegan beef", "free range veggies", "neon fanny pack"];
var computerSecretPhrase = "";
var guessedLetterList = [];
var wrongGuessCount;
const maxWrongGuesses = 10;
var userGuessDisplay;
var gameInProgress = false;

// todo: hash the phrases so that the TAs can't cheat!

function displayRemainingLetters() {
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

function displayGuessArea() {
	var guessArea = document.getElementById("guess-area");
	userGuessDisplay = "";
	for(var i = 0; i < computerSecretPhrase.length; i++) {
		if (guessedLetterList.includes(computerSecretPhrase[i])) {
			userGuessDisplay += computerSecretPhrase[i];
		}
		else if (computerSecretPhrase[i] == " ") {
			userGuessDisplay += "-";
		}
		else {
			userGuessDisplay += "_";
		}
	}
	console.log("userGuessDisplay is: " + userGuessDisplay);
	guessArea.innerHTML = "<p>" + userGuessDisplay + "</p>";
}

function displayGuessesRemaining() {
	var guessesRemainingArea = document.getElementById("guesses-remaining");
	var wrongGuessesRemaining = maxWrongGuesses - wrongGuessCount;
	guessesRemainingArea.innerHTML = "<p>Wrong Guesses Remaining: " + wrongGuessesRemaining;
}

function startHangmanGame() {
	gameInProgress = true;
	wrongGuessCount = 0;
	computerSecretPhrase = phrasesToGuess[Math.floor(Math.random() * phrasesToGuess.length)];
	guessedLetterList = [];
	displayGuessArea();
	displayRemainingLetters();
	displayGuessesRemaining();
}

document.getElementById("start-hangman-game").onclick = startHangmanGame;

// currently refactoring the function below
// also, adding in the boolean gameInProgress (did I finish that?)
// next, add scores
// then add modal for win/loss
// then add style in general

function userGuessesLetter(userKey) {
	if (guessedLetterList.includes(userKey)) {
		alert("You already guessed " + userKey + "!");
		return;
	}
	//displayGuessesRemaining();
	//else { // user guessed a new letter, add to guessed list and check for win or loss
		displayGuessesRemaining();
		guessedLetterList.push(userKey);
		displayGuessArea();
		displayRemainingLetters();
		
		if (!userGuessDisplay.includes('_')) { // if there are no underscores left in display, user has won:
			setTimeout(function() { 
				alert("YOU WON BRO");
			}, 100);
		}
		if (!computerSecretPhrase.includes(userKey)) { // Bad Guess
			wrongGuessCount++;
			if (wrongGuessCount > maxWrongGuesses) {
				setTimeout(function() { 
					alert("YOU LOST BRO");
				}, 100);
			}
		}
	//}
}

document.onkeyup = function(event) {
	//var userKey = event.key;
	if (!gameInProgress) {
		return
	}
	if (event.key < 'a' || event.key > 'z') {
		return;
	}
	userGuessesLetter(event.key);
}