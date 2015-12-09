/* **** Guessing Game Functions **** */

// Generate the Winning Number and other variables

function initiateGame(){
	var winningNumber = Math.floor((Math.random() * 100) + 1);
	var totalGuesses = 0;
	var guessList = [];
	var guesses = '';
	var guess = 0;
	console.log('game initiated');
	// Fetch the Players Guess

	function playersGuessSubmission(){
		console.log('playersGuessSubmission');
		// hide all alerts
		$('.alert').hide();
		// do they have guesses remaining?
		if (totalGuesses < 5) {
			// get the input value
			guess = $('#guess').val();
			// if its a valid guess
			console.log(guess);
			if (guess > 0 && guess < 101) {
				console.log('valid');
				// if the number has already been guessed
				if ($.inArray(guess, guessList) > -1) {
					$('#silly').show();
				} else {
					// store the new guess in the array
					guessList.push(guess);
					guesses = guessList.join(',');
					$('.panel-footer').text(guesses);

					//check if its right
					checkGuess(guess);

					//calculate the total guesses update badge
					totalGuesses++
					$('.badge').text(5 - totalGuesses);
					//set the width of the progress bar
					var width = '';
					percent = totalGuesses/5 * 100;
					width = 100 - percent + '%';
					$('.progress-bar').width(width);
					if (totalGuesses === 5){
						$('#runout').show();
					}
				}
			} else	{
				console.log("hey");
				$('#badguess').show();
			}		
		} else {
			$('#runout').show();
		}
	};
	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(num){
		// add code here
		var diff = winningNumber - num;
		var absDiff = Math.abs(winningNumber - num);
		// if winning number is higher
		if ( diff > 0) {
			if (absDiff > 20) {
				$('#higher').text('Nope its higher by a lot');
			} else {
				$('#higher').text('Nope its higher by a lil');
			}
			$('#higher').show();
		} else {
			if (absDiff > 20) {
				$('#lower').text('Nope its lower by a lot');
			} else {
				$('#lower').text('Nope its lower by a lil');
			}
			$('#lower').show();
		}
		$('#guess').val('');
	}
	// Check if the Player's Guess is the winning number 

	function checkGuess(num){
		// add code here
		if (num == winningNumber) {
			// load the giff
			$('.modal-body').html('<iframe src="http://giphy.com/embed/xNBcChLQt7s9a" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
			$("#myModal").modal({
				// dont let users click or key off modal
				backdrop: 'static',
	  			keyboard: false
			});
		} else {
			lowerOrHigher(num);
		}
	}
	// Allow the "Player" to Play Again

	function showHint(){
		$('#hintBox').show();
		$('#answer').text(winningNumber);
	}
	// listen for a button click
	$( '#go' ).on( 'click', playersGuessSubmission );

	// show the hint
	$( '#hint-btn' ).on( 'click', showHint );

	// listen for the enter key
	$( 'input' ).on('keyup',function( event ) {
		if ( event.which == 13 ) {
		    $(playersGuessSubmission);
		}
	});
	return;
}

function playAgain(){
		// simply refresh the page
		// location.reload();
		// or reset everything
		initiateGame();
		$('.alert').hide();
		$('.progress-bar').width('100%');
		$('.badge').text(5);
		$('.panel-footer').text('');
		$('#guess').val('');
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
   	initiateGame();
});

// reset the game
$( '.play-again' ).on( 'click', playAgain );




 


