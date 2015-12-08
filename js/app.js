/* **** Guessing Game Functions **** */


var guess,
    winningNumber,
    totalGuesses = 0,
    guessList = [],
    guesses = '';

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	var max = 100;
	var min = 1;
	winningNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// hide all alerts
	$('.alert').hide();
	// do they have guesses remaining?
	if (totalGuesses < 5) {
		// get the input value
		var guess = $('#guess').val();
		// if the number has already been guessed
		if ($.inArray(guess, guessList) > -1) {
			$('#silly').show();
		} else {
			// store the new guess in the array
			guessList.push(guess);
			guesses = guessList.join(',');
			$('.panel-footer').text(guesses);

			//check if its right
			$(checkGuess(guess));

			//calculate the total guesses update badge
			totalGuesses++
			$('.badge').text(5 - totalGuesses);
			//set the width of the progress bar
			var width = '';
			percent = totalGuesses/5 * 100;
			width = percent + '%';
			$('.progress-bar').width(width);
			if (totalGuesses === 5){
				$('#runout').show();
			}
		}
		
	} else {
		$('#runout').show();
	}

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(num){
	// add code here
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
	if (num == winningNumber) {
		$('.alert-success').show();
		$("#myModal").modal();
	} else {
		lowerOrHigher(num);
	}
}

function showHint(){
	$('#hintBox').show();
	$('#answer').text(winningNumber);
}


// Allow the "Player" to Play Again

function playAgain(){
	// simply refresh the page
	location.reload();
	// or reset everything
	// $(generateWinningNumber);
	// $('.alert').hide();
	// totalGuesses = 0;
	// guessList = [];
	// $('.progress-bar').width('0%');
	// $('.badge').text(5);
	// $('.panel-footer').text('');
	// $('#guess').val('');
}



/* **** Event Listeners/Handlers ****  */
$( document ).ready(function() {
   	$(generateWinningNumber);
});

$( '#go' ).on( 'click', playersGuessSubmission );
$( '.play-again' ).on( 'click', playAgain );
$( '#hint-btn' ).on( 'click', showHint );

$('input').bind("enterKey",function(e){
   //do stuff here
   $(playersGuessSubmission);

});
$('input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});
