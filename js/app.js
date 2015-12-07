/* **** Guessing Game Functions **** */


var guess,
    winningNumber,
    totalGuesses = 0;

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	var max = 100;
	var min = 1;
	winningNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log(winningNumber);
	return;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	$('.alert').hide();
	var guess = $('#guess').val();
	$(checkGuess(guess));
	totalGuesses++
	$('.badge').text(totalGuesses);
	var width = "";
	percent = totalGuesses/5 * 100;
	width = percent + "%";
	$('.progress-bar').width(width);
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(num){
	// add code here
	console.log('lowerOrHigher ran');
	var diff = winningNumber - num;
	var absDiff = Math.abs(winningNumber - num);
	// if winning number is higher
	if ( diff > 0) {
		$('#higher').show();
	} else {
		$('#lower').show();
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(num){
	// add code here
	console.log('checkGuess ran');
	if (num == winningNumber) {
		$('.alert-success').show();
	} else {
		lowerOrHigher(num);
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$( document ).ready(function() {
   	$(generateWinningNumber);
});

$( '#go' ).on( 'click', playersGuessSubmission );
