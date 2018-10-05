var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var phrasesToGuess = ["gastropub", "farm to table", "edison bulb", "homemade bitters", "ironic tattoo", "eight bits", "single origin coffee", "ironic prose", "taxidermied fish", "cornhole tournament", "pabst blue ribbon", "homemade kombucha", "succulent garden", "beard fashion", "vegan beef", "free range veggies", "neon fanny pack"];
var computerSecretPhrase = "";
var userGuessedLetters = [];
var wrongGuessCount;
const maxWrongGuesses = 10;
var userGuessDisplay;
// todo: add a gameInProgress var - don't process keyboard input if game is not in progress...
// var startGameButton = document.getElementById("start-hangman-game");
// todo: hash the phrases so that the TAs can't cheat!

function displayRemainingLetters() {
	var remainingLetterBox = document.getElementById("remaining-letters");
	var displayString = "";
	for(var i = 0; i < alphabet.length; i++) {
		if (!userGuessedLetters.includes(alphabet[i])) {
			displayString += alphabet[i];
			displayString += " ";
		}
		else {
			displayString += "_ ";
		}
	}
	remainingLetterBox.innerHTML = "<p>" + displayString + "</p>";
}

function displayGuessArea() {
	var guessArea = document.getElementById("guess-area");
	userGuessDisplay = "";
	for(var i = 0; i < computerSecretPhrase.length; i++) {
		if (userGuessedLetters.includes(computerSecretPhrase[i])) {
			userGuessDisplay += computerSecretPhrase[i] + " ";
			//userGuessDisplay += " "
		} // todo: see if two statements can be combined above
		else if (computerSecretPhrase[i] == " ") {
			userGuessDisplay += "- "; // todo: add span with class id rather than spaces
		}
		else {
			userGuessDisplay += "_ ";
		}
	}
	console.log("userGuessDisplay is: " + userGuessDisplay);
	guessArea.innerHTML = "<p>" + userGuessDisplay + "</p>";
}

function startHangmanGame() {
	wrongGuessCount = 0;
	computerSecretPhrase = phrasesToGuess[Math.floor(Math.random() * phrasesToGuess.length)];
	userGuessedLetters = [];
	displayGuessArea();
	displayRemainingLetters();
}

document.getElementById("start-hangman-game").onclick = startHangmanGame;

document.onkeyup = function(event) {
	var userKey = event.key;
	if (userKey < 'a' || userKey > 'z') {
		return;
	}
	if (userGuessedLetters.includes(userKey)) {
		alert("You already guessed " + userKey + "!");
		return;
	}
	else { // user guessed a new letter, add to guessed list and check for win or loss
		userGuessedLetters.push(userKey);
		displayGuessArea();
		displayRemainingLetters();
		
		if (!userGuessDisplay.includes('_')) { // if there are no underscores left in display, user has won:
			setTimeout(function() { 
				alert("YOU WON BRO");
			}, 700);
		}
		if (!computerSecretPhrase.includes(userKey)) { // Bad Guess
			wrongGuessCount++;
			if (wrongGuessCount > maxWrongGuesses) {
				setTimeout(function() { 
					alert("YOU LOST BRO");
				}, 700);
			}
		}
	}
}

//startGameButton.addEventListener("click", startHangmanGame()); <- caused immediate execution beause of (), are you kidding me?!
//startGameButton.addEventListener("click", startHangmanGame; <- correct syntax
